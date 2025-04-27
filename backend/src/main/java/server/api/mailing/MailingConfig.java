package server.api.mailing;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
@ConfigurationProperties( prefix = "mailing" )
public class MailingConfig {
  @Autowired
  private MailProperties properties;

  @Bean
  public JavaMailSender getSender() {
    JavaMailSenderImpl impl = new JavaMailSenderImpl();
    impl.setHost(this.properties.getServer());
    impl.setPort(this.properties.getPort());
    impl.setUsername(this.properties.getUsername());
    impl.setPassword(this.properties.getPassword());

    Properties props = impl.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    
    return impl;
  }
}
