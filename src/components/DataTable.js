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

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
          <TableCell align="center" style={{ fontWeight: 600 }}>
            {rows.filter((pub) => pub.service_body_bigint === row.id).length}
          </TableCell>
        </TableRow>
        {/* ))} */}
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Typography variant="h6" gutterBottom component="h6">
                  Published
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day Of Week</TableCell>
                      <TableCell>In Person</TableCell>
                      <TableCell>Hybrid</TableCell>
                      <TableCell>Virtual</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weekdays.map((day, idx) => (
                      <TableRow key={`weekday-${idx}`}>
                        <TableCell component="th" scope="row">
                          {day}
                        </TableCell>
                        <TableCell>
                          {
                            rows.filter(
                              (pub) =>
                                pub.service_body_bigint === row.id &&
                                pub.venue_type === "1" &&
                                pub.weekday_tinyint === "1"
                            ).length
                          }
                        </TableCell>
                        {/* <TableCell align="right">
                            {historyRow.amount}
                          </TableCell>
                          <TableCell align="right">
                            {Math.round(historyRow.amount * row.price * 100) /
                              100}
                          </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 2 }}>
                <Typography variant="h6" gutterBottom component="h6">
                  Unpublished
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day Of Week</TableCell>
                      <TableCell>In Person</TableCell>
                      <TableCell>Hybrid</TableCell>
                      <TableCell>Virtual</TableCell>
                      <TableCell>Total</TableCell>
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
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
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
            <TableCell align="center" style={{ fontWeight: 600 }}>
              Total
            </TableCell>
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
