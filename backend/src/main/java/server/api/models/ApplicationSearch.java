package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
public class ApplicationSearch {
    @JsonIgnore
    private String userId;
    private String status;
    private String priority;
    private String employer;

    private Instant dateCreatedStart;
    private Instant dateCreatedEnd;

    private Instant dateAppliedStart;
    private Instant dateAppliedEnd;

    private List<String> keywords;

    private Double salaryMin;
    private Double salaryMax;
}
