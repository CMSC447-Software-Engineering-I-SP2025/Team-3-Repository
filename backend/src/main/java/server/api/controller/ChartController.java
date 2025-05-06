package server.api.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.lang.Assert;
import server.api.charting.BarChartMonth;
import server.api.charting.DatavizResponse;
import server.api.charting.PieChartData;
import server.api.dao.ApplicationDAO;
import server.api.dao.UserDAO;
import server.api.models.AppStatus;
import server.api.models.Application;
import server.api.models.ApplicationSearch;
import server.api.models.User;
import server.api.security.CurrentUserResolver;

@RestController
@RequestMapping("charts")
public class ChartController {

  private final ApplicationDAO applicationDAO;
  private final UserDAO userDAO;
  private static final Logger LOG = LoggerFactory.getLogger(ChartController.class); 

  public ChartController(ApplicationDAO appDao, UserDAO userDAO) {
    Assert.notNull(appDao);
    this.applicationDAO = appDao;
    this.userDAO = userDAO;
  }

  @PostMapping("/big-boy")
  public ResponseEntity<DatavizResponse> getAllFormats(@RequestBody ApplicationSearch request) {
    Assert.notNull(request);
    DatavizResponse response = new DatavizResponse();

    String uid = CurrentUserResolver.getUserId();
    User user = this.userDAO.findById(uid);

    if (user == null) {
      return ResponseEntity.notFound().build();
    }

    request.setUserId(user.getId().toString());
    List<Application> applications = this.applicationDAO.doFilter(request);
    HashMap<String, List<Application>> byDate = new HashMap<>();
    HashMap<String, List<Application>> byMonth = new HashMap<>();

    // prepare by-month and by-date maps
    for (Application app : applications) {
      LocalDate date = LocalDate.ofInstant(app.getDateCreated(), ZoneId.of("UTC"));
      String monthKey = date.getMonth().toString();

      List<Application> apps = byMonth.get(monthKey);
      if (apps == null) {
        byMonth.put(monthKey, List.of(app));
      } else {
        List<Application> newList = new ArrayList<>(apps);
        newList.add(app);
        byMonth.put(monthKey, newList);
      }

      DateTimeFormatter format = DateTimeFormatter.ofPattern("LLLL dd yyyy");
      String formatString = date.format(format);
      List<Application> dateApps = byDate.get(formatString);

      if (dateApps == null) {
        byDate.put(formatString, List.of(app));
      } else {
        List<Application> newList = new ArrayList<>(dateApps); 
        newList.add(app);
        byDate.put(formatString, newList);
      }
    }

    response.setBar(this.generateBarChart(byMonth));
    response.setPie(this.generatePieChartData(applications));
    response.setLine(this.generateLineChartData(byDate));

    return ResponseEntity.ok(response);
  }

  // helper to generate bar chart
  private List<BarChartMonth> generateBarChart(HashMap<String, List<Application>> applications) {
    List<BarChartMonth> response = new ArrayList<>();

    // collect monthly status-based entries for bar chart
    for (Entry<String, List<Application>> entry :  applications.entrySet()) {
      BarChartMonth month = new BarChartMonth();
      month.setMonth(entry.getKey());

      HashMap<AppStatus, Integer> values = new HashMap<>();
      for (Application app : entry.getValue()) {

        if (values.get(app.getStatus()) == null) {
          values.put(app.getStatus(), 1);
        } else {
          values.put(app.getStatus(), values.get(app.getStatus()) + 1);
        }
      }
      month.setMappings(values);

      response.add(month);
    }

    return response;
  }

  private PieChartData generatePieChartData(List<Application> apps) {
    PieChartData response = new PieChartData();
    HashMap<AppStatus, Integer> mappings = new HashMap<>();

    for (AppStatus status : AppStatus.values()) {
      mappings.put(status, 0);
    }

    for (Application app : apps) {
      AppStatus status = app.getStatus();
      Integer value = mappings.get(status) + 1;
      mappings.put(status, value);
    }

    response.setMappings(mappings);
    return response;
  }

  private List<Pair<LocalDate, Integer>> generateLineChartData(HashMap<String, List<Application>> data) {
    return data.entrySet()
    .stream()
    .map(item -> {
      String dateString = item.getKey();
      DateTimeFormatter format = DateTimeFormatter.ofPattern("LLLL dd yyyy");
      LocalDate date = LocalDate.parse(dateString, format);
      Pair<LocalDate, Integer> pair = Pair.of(date, item.getValue().size());
      return pair;
    })
    .sorted((a, b)-> a.getFirst().compareTo(b.getFirst()))
    .toList();

  }
  
}
