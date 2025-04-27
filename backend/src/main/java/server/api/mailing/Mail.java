package server.api.mailing;

import org.springframework.mail.SimpleMailMessage;

import lombok.Data;

@Data
public class Mail {
  private String from;
  private String to;
  private String subject;
  private String text;

  public SimpleMailMessage toMailable() {
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setFrom(this.getFrom());
    msg.setTo(this.getTo()); 
    msg.setSubject(this.getSubject()); 
    msg.setText(this.getText());

    return msg;
  }
}
