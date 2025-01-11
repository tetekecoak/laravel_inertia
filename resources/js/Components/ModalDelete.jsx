import { Modal,Button } from "flowbite-react"
import { HiTrash } from "react-icons/hi"
import { MdCancel } from "react-icons/md"
import { RiErrorWarningLine } from "react-icons/ri";

const ModalDelete = ({isOpen = false,onClose = () => {}, onSubmit = () => {}}) => (
    <Modal
    size="md"
    show={isOpen}
    position="center"
    onClose={onClose}
  >
    <Modal.Body>
      <div className="flex justify-center flex-col space-y-4 items-center">
        <RiErrorWarningLine className="w-14 h-14" />
        <div className="text-md text-center">
            Are you sure you want to delete this data?
        </div>
        <div className="flex space-x-2">
          <Button color="secondary" onClick={onClose}>
            <MdCancel className="mr-2 h-5 w-5"/>
            <span>No, Cancel</span>
          </Button>
          <Button color="red" onClick={onSubmit}>
            <HiTrash className="mr-2 h-5 w-5"/>
            <span>Yes, I'm sure</span>
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
)

export default ModalDelete