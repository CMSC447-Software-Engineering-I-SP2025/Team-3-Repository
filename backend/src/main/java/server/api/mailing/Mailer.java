package server.api.mailing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class Mailer {
  @Autowired
  private JavaMailSender sender;

  @Value("${mailing.from}")
  private String fromAddress;

  // empty, does nothing
  public Mailer() {}

  public void send(Mail mail) {
    Assert.notNull(mail, "Mail cannot be null");

    mail.setFrom(this.fromAddress);
    this.sender.send(mail.toMailable());
  }
}
