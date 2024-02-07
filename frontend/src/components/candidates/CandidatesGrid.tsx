import "./candidatesGrid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { baseUrl } from "../../constants/url";
import { ICandidate } from "../../types/globalTyping";
import { PictureAsPdf } from "@mui/icons-material";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 300 },
  { field: "lastName", headerName: "Last Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "phone", headerName: "Phone", width: 300 },
  {
    field: "coverLetterUrl",
    headerName: "Cover Letter",
    width: 200,
    renderCell: (params) => (
      <a
        href={`${baseUrl}/Candidate/download/coverletter/${params.row.coverLetterURL}`}
        download
      >
        <PictureAsPdf />
      </a>
    ),
  },
  {
    field: "resumeUrl",
    headerName: "Resume",
    width: 200,
    renderCell: (params) => (
      <a
        href={`${baseUrl}/Candidate/download/resume/${params.row.resumeURL}`}
        download
      >
        <PictureAsPdf />
      </a>
    ),
  },
];

interface ICandidatesGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
