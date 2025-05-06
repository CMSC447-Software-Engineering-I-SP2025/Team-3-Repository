package server.api.charting;
import lombok.Data;
import server.api.models.AppStatus;

import java.util.HashMap;

@Data
public class BarChartMonth {
  private String month;
  private HashMap<AppStatus, Integer> mappings;
}