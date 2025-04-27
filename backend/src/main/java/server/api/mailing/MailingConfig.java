package server.api.mailing;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailingConfig {
  @Bean
  public JavaMailSender getSender() {
    JavaMailSenderImpl impl = new JavaMailSenderImpl();
    impl.setHost("smtp.test.com");
    impl.setPort(587);
    impl.setUsername("test");
    impl.setPassword("password");

    Properties props = impl.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.debug", "true");
    
    return impl;
  }
}
