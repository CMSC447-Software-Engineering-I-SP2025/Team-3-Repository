package server.api.mailing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class Mailer {
  @Autowired
  private JavaMailSender sender;

  // empty, does nothing
  public Mailer() {}

  public void send(Mail mail) {
    Assert.notNull(mail, "Mail cannot be null");

    this.sender.send(mail.toMailable());
  }
}
