package server.api.mailing;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties( prefix = "mailing" )
public class MailProperties {
  private String server;
  private int port;
  private String username;
  private String password;
}