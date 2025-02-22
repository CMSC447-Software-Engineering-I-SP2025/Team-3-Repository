package server.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;


@RestController
public class BaseController {
  public BaseController() { }

  @GetMapping("/base-controller")
  public ResponseEntity<String> doHello() {
    return ResponseEntity.ok("Hello World");
  }
}

