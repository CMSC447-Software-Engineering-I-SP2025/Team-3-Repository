package server.api.charting;
import lombok.Data;
import java.util.HashMap;

@Data
public class BarChartMonth {
  private String month;
  private HashMap<String, Integer> mappings;
}