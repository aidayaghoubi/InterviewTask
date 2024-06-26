import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TITLES } from "../static"
import { TPerson } from "../App";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IDataModal {
  modal: TPerson | undefined,
  setModal: (state: TPerson | undefined) => void
}

const DataModal = ({ modal, setModal }: IDataModal) => {

  return <Modal
    open={!!modal?.id}
    onClose={() => setModal(undefined)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} size="small">
          <TableHead>
            <TableRow>
              {TITLES.map((title) => (
                <TableCell align="right" sx={{ fontWeight: "bold" }}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={modal?.id} className="item">
              <TableCell align="right">{modal?.id}</TableCell>
              <TableCell align="right">{modal?.age}</TableCell>
              <TableCell align="right">{modal?.visits}</TableCell>
              <TableCell align="right">{modal?.progress}</TableCell>
              <TableCell align="right">{modal?.status}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Modal>
}
export default DataModal