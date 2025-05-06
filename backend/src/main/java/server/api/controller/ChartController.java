package server.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.lang.Assert;
import server.api.charting.DatavizResponse;
import server.api.dao.ApplicationDAO;
import server.api.models.Application;
import server.api.models.ApplicationSearch;

@RestController
@RequestMapping("charts")
public class ChartController {

  private final ApplicationDAO applicationDAO;

  public ChartController(ApplicationDAO appDao) {
    Assert.notNull(appDao);
    this.applicationDAO = appDao;
  }

  @PostMapping("/big-boy")
  public ResponseEntity<DatavizResponse> getAllFormats(@RequestBody ApplicationSearch request) {
    Assert.notNull(request);

    List<Application> applications = this.applicationDAO.doFilter(request);
  }
  
}
