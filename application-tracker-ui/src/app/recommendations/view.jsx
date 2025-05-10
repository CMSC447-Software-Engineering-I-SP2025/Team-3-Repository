'use client'
import { useState } from "react";
import { Box, Grid, Card, Typography, Chip, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function RecommendationsView({ jobs }) {
  // page state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12; //3 x 4
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const skillsSet = new Set();
  jobs.forEach(job => {
    if (Array.isArray(job.keywords)) {
      job.keywords.forEach(skill => skillsSet.add(skill));
    }
  });
  const skills = Array.from(skillsSet);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Top Matches based on your skills</Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {skills.join(", ") || "None"}
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {currentJobs.map((job) => (
            <Grid item xs={4} key={job.id}>
              <Card
                sx={{
                  p: 2,
                  border: "1px solid rgb(214, 208, 208)",
                  bgcolor: "#fafafa",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#e3f2fd", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                }}
                onClick={() => {}}
              >
                <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                  {job.employerId}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", mb: 1 }}>
                  {/* no salary or job title, just employerId for now */}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {Array.isArray(job.keywords) && job.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      size="small"
                      color="primary"
                      variant="filled"
                      sx={{ height: 20, fontSize: "0.75rem" }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, py: 1, display: "flex", justifyContent: "center", gap: 2, zIndex: 0 }}>
        <IconButton
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          <ArrowBack />
        </IconButton>
        <Typography sx={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
}
