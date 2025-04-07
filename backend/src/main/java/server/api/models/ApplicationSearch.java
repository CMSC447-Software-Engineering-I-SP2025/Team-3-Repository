package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ApplicationSearch {
    private String status;
    private String priority;
    private String employer;

    private String dateCreatedStart;
    private String dateCreatedEnd;

    private String dateAppliedStart;
    private String dateAppliedEnd;

    private List<String> keywords;

    private Double salaryMin;
    private Double salaryMax;
}
