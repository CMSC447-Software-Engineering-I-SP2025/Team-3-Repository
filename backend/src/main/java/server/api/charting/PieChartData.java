package server.api.charting;

import java.util.HashMap;
import server.api.models.AppStatus;
import lombok.Data;

@Data
public class PieChartData {
  private HashMap<AppStatus, Integer> mappings;
}
