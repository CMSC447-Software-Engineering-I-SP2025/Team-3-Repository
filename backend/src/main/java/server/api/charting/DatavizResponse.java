package server.api.charting;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.util.Pair;

import lombok.Data;

@Data
public class DatavizResponse {
  private List<BarChartMonth> bar;
  private List<Pair<LocalDate, Integer>> line;
  private PieChartData pie;
}
