import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function DataTable({ meetings, serviceBodies }) {
  const rows = [];
  serviceBodies.forEach((body) => {
    meetings.forEach((meeting) => {
      if (meeting.service_body_bigint === body.id) {
        rows.push({ ...meeting, ...body });
      }
    });
  });

  console.log("row", rows);
  function Row({ row }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        {/* {serviceBodies.map((body) => ( */}
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center">
            {
              rows.filter(
                (pub) =>
                  pub.service_body_bigint === row.id && pub.published === "1"
              ).length
            }
          </TableCell>
          <TableCell align="center">
            {
              rows.filter(
                (pub) =>
                  pub.service_body_bigint === row.id && pub.published === "0"
              ).length
            }
          </TableCell>
          <TableCell align="center">
            {
              rows.filter(
                (pub) =>
                  pub.service_body_bigint === row.id && pub.venue_type === "1"
              ).length
            }
          </TableCell>
          <TableCell align="center">
            {
              rows.filter(
                (pub) =>
                  pub.service_body_bigint === row.id && pub.venue_type === "3"
              ).length
            }
          </TableCell>
          <TableCell align="center">
            {
              rows.filter(
                (pub) =>
                  pub.service_body_bigint === row.id && pub.venue_type === "2"
              ).length
            }
          </TableCell>
          <TableCell align="center">
            {rows.filter((pub) => pub.service_body_bigint === row.id).length}
          </TableCell>
        </TableRow>
        {/* ))} */}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) /
                            100}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Area</TableCell>
            <TableCell align="center">Published</TableCell>
            <TableCell align="center">Unpublished</TableCell>
            <TableCell align="center">In Person</TableCell>
            <TableCell align="center">Hybrid</TableCell>
            <TableCell align="center">Virtual</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceBodies
            .filter((b) => b.id !== "1")
            .map((body) => (
              <Row key={body.id} row={body} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
