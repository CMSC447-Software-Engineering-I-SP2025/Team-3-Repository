'use client'
import { useState } from "react";
import { Box, Grid, Card, Typography, Chip, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function RecommendationsView({ user }) {
  // fake data delete after api implemented
  const skills = ["javascript", "sql"];
  const jobs = [
    { id: "1", jobTitle: "Frontend Developer", company: "Amazon", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
    { id: "2", jobTitle: "Backend Developer", company: "Apple", salary: "$120,000 - $140,000", keywords: ["mongodb", "sql"] },
    { id: "3", jobTitle: "Full Stack Developer", company: "Google", salary: "$120,000 - $140,000", keywords: ["react", "javascript", "mongodb", "sql"] },
    { id: "4", jobTitle: "Frontend Developer", company: "Meta", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
    { id: "5", jobTitle: "Backend Developer", company: "Amazon", salary: "$120,000 - $140,000", keywords: ["mongodb", "sql"] },
    { id: "6", jobTitle: "Full Stack Developer", company: "Apple", salary: "$120,000 - $140,000", keywords: ["react", "javascript", "mongodb", "sql"] },
    { id: "7", jobTitle: "Frontend Developer", company: "Google", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
    { id: "8", jobTitle: "Backend Developer", company: "Meta", salary: "$120,000 - $140,000", keywords: ["mongodb", "sql"] },
    { id: "9", jobTitle: "Full Stack Developer", company: "Amazon", salary: "$120,000 - $140,000", keywords: ["react", "javascript", "mongodb", "sql"] },
    { id: "10", jobTitle: "Frontend Developer", company: "Apple", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
    { id: "11", jobTitle: "Backend Developer", company: "Google", salary: "$120,000 - $140,000", keywords: ["mongodb", "sql"] },
    { id: "12", jobTitle: "Full Stack Developer", company: "Meta", salary: "$120,000 - $140,000", keywords: ["react", "javascript", "mongodb", "sql"] },
    { id: "13", jobTitle: "Frontend Developer", company: "Amazon", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
    { id: "14", jobTitle: "Backend Developer", company: "Apple", salary: "$120,000 - $140,000", keywords: ["mongodb", "sql"] },
    { id: "15", jobTitle: "Full Stack Developer", company: "Google", salary: "$120,000 - $140,000", keywords: ["react", "javascript", "mongodb", "sql"] },
    { id: "16", jobTitle: "Frontend Developer", company: "Meta", salary: "$120,000 - $140,000", keywords: ["react", "javascript"] },
  ];

  //page state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12; //4 rows 3 columns per
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3}}>
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
                  border: "1px solidrgb(214, 208, 208)",
                  bgcolor: "#fafafa",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#e3f2fd", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                }}
                onClick={() => {}}
              >
                <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                  {job.jobTitle}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                  {job.company}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", mb: 1 }}>
                  {job.salary}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {job.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      size="small"
                      color={skills.includes(keyword) ? "primary" : "default"}
                      variant={skills.includes(keyword) ? "filled" : "outlined"}
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