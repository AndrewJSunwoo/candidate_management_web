import { useState, useEffect } from "react";
import "./candidate.scss";
import { ICreateCandidateDto, IJob } from "../../types/globalTyping";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/httpModule";

const AddCandidatePage = () => {
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobId: "",
  });
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [coverLetterPdfFile, setCoverLetterPdfFile] = useState<File | null>();
  const [resumePdfFile, setResumePdfFile] = useState<File | null>();

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phone === "" ||
      candidate.jobId === "" ||
      !coverLetterPdfFile ||
      !resumePdfFile
    ) {
      alert("Fill all fields");
      return;
    }
    const newCandidateFormData = new FormData();
    newCandidateFormData.append("firstName", candidate.firstName);
    newCandidateFormData.append("lastName", candidate.lastName);
    newCandidateFormData.append("email", candidate.email);
    newCandidateFormData.append("phone", candidate.phone);
    newCandidateFormData.append("jobId", candidate.jobId);
    newCandidateFormData.append("coverLetterPdfFile", coverLetterPdfFile);
    newCandidateFormData.append("resumePdfFile", resumePdfFile);

    httpModule
      .post("/Candidate/Create", newCandidateFormData)
      .then((response) => redirect("/candidates"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidate.jobId}
            label="Job"
            onChange={(e) =>
              setCandidate({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />
        CoverLetter
        <input
          type="file"
          onChange={(event) =>
            setCoverLetterPdfFile(
              event.target.files ? event.target.files[0] : null
            )
          }
        />
        Resume
        <input
          type="file"
          onChange={(event) =>
            setResumePdfFile(event.target.files ? event.target.files[0] : null)
          }
        />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidatePage;
