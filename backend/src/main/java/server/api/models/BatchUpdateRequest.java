package server.api.models;

import java.util.List;

import lombok.Data;

@Data
public class BatchUpdateRequest {
  public enum BatchUpdateType {
    STATUS, PRIORITY
  };
  
  private List<String> applicationIds;
  private BatchUpdateType type;
  private AppStatus status;
  private AppPriority priority;
}