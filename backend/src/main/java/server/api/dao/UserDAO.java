package server.api.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;
import java.util.List;
import java.util.ArrayList;

import server.api.models.User;
import server.api.database.DatabaseConnector;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import org.springframework.util.StringUtils;
import org.bson.types.ObjectId;
import org.bson.conversions.Bson;

public class UserDAO {
    private final DatabaseConnector client;
    private static final String COLLECTION = "users";
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserDAO(DatabaseConnector client) {
        Assert.notNull(client, "Client cannot be null.");
        this.client = client;
    }

    public List<User> getAll() {
        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);
        List<User> users = new ArrayList<>();
        collection.find().into(users);
        return users;
    }

    public User findById(String id) {
        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);
        Bson query = Filters.eq("_id", new ObjectId(id));
        return collection.find(query).limit(1).first();
    }
	
	public User findByEmail(String email) {
        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);
        Bson query = Filters.eq("email", email);
        return collection.find(query).limit(1).first();
    }

	public User findByUsername (String username) {
        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);
        Bson query = Filters.eq("username", username);
        return collection.find(query).limit(1).first();
    }

    public User createOne(User user) {
        if (user == null) {
            return null;
        }
		
		// No duplicate emails allowed
		User existingUser = findByEmail(user.getEmail());
        if (existingUser != null) {
            return null;
        }

        user.setId(null);
        user.setPasswordHash(this.passwordEncoder.encode(user.getPasswordHash()));
        if (user.getSkills() == null) {
            user.setSkills(new ArrayList<>());
        }

        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);

        InsertOneResult writeResult = collection.insertOne(user);
        if (writeResult.getInsertedId() == null) {
            return null;
        }

        user.setId(writeResult.getInsertedId().asObjectId().getValue());
        user.setPasswordHash(null);
        return user;
    }

    public boolean deleteOne(String id) {
        if (!StringUtils.hasText(id)) {
            return false;
        }

        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);
        Bson query = Filters.eq("_id", new ObjectId(id));

        DeleteResult result = collection.deleteOne(query);
        return result.getDeletedCount() == 1;
    }

    public boolean updateOne(User user) {
        if (user == null || user.getId() == null) {
            return false;
        }

        MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);

        Bson query = Filters.eq("_id", user.getId());
        Bson update = Updates.combine(
                Updates.set("username", user.getUsername()),
                Updates.set("firstName", user.getFirstName()),
                Updates.set("lastName", user.getLastName()),
                Updates.set("email", user.getEmail()),
                Updates.set("skills", user.getSkills())
        );

        UpdateResult result = collection.updateOne(query, update);
        return result.getModifiedCount() == 1;
    }
	
	public boolean updatePassword(User user, String password) {
		if (user == null || user.getId() == null || !StringUtils.hasText(password)) {
			return false;
		}

        String newPassword = this.passwordEncoder.encode(password);
		MongoCollection<User> collection = this.client.instance(COLLECTION, User.class);

		Bson query = Filters.eq("_id", user.getId());
		Bson update = Updates.set("passwordHash", newPassword);

		UpdateResult result = collection.updateOne(query, update);
		return result.getModifiedCount() == 1;
	}
}
