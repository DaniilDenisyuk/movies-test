import FilmForm from "./FilmForm";
import FilmInfo from "./FilmInfo";
import ConfirmDeletion from "./ConfirmDeletion";
import Modal from "../HOCs/Modal";

export const FilmFormModal = Modal(FilmForm);
export const FilmInfoModal = Modal(FilmInfo);
export const ConfirmDeletionModal = Modal(ConfirmDeletion);
