package server.api.charting;

import java.util.List;

import lombok.Data;

@Data
public class PieChartData {
  private List<String> labels;
  private List<Integer> values;
}
