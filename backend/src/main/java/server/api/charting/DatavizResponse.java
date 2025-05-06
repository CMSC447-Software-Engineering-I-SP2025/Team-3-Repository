package server.api.charting;
import java.util.List;
import lombok.Data;

@Data
public class DatavizResponse {
  private List<BarChartMonth> barChartData;
  private PieChartData pieChartData;
}
