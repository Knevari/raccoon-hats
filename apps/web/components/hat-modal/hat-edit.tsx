import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { HatColor } from "./hat-color";
import { HatSize } from "./hat-size";
import { Modal } from "../modal";

import { AiOutlinePlus } from "react-icons/ai";

import { hatsApi } from "../../api/hats";
import { useToggle } from "../../hooks/useToggle";
import { debounce } from "../../utils/debounce";
import { useHatsContext } from "../../contexts/hats";
import { buildFormDataFromObject } from "../../utils";

import {
  Hat,
  HatSize as HatSizeType,
  availableHatSizes,
  availableHatStyles,
} from "../../contexts/hats/types";

export interface HatEditProps extends Hat {
  onCloseModal: () => void;
  onHijackScroll: () => void;
  onReleaseScroll: () => void;
}

export function HatEdit(props: HatEditProps) {
  const [isDeleteModalOpen, onToggleDeleteModal] = useToggle();
  const { fetchHats } = useHatsContext();

  const [fields, setFields] = useState<Omit<Hat, "_id" | "imageUrl">>({
    name: props.name,
    style: props.style,
    colors: props.colors,
    sizes: props.sizes,
    details: props.details,
    price: props.price,
  });

  const onChangeField = (name: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeColors = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const currentColors = [...fields.colors];
      currentColors[index] = e.target.value;
      onChangeField("colors", currentColors);
    }),
    [fields, onChangeField]
  );

  const onClearColorSelection = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onChangeField("colors", []);
    },
    [onChangeField]
  );

  const onAddColor = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onChangeField("colors", [...fields.colors, "#F74D4D"]);
    },
    [onChangeField]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToUpdate = Object.keys(fields).reduce(
      (prev, fieldName) => {
        if (fields[fieldName] !== props[fieldName]) {
          prev[fieldName] = fields[fieldName];
        }

        return prev;
      },
      {} as Partial<typeof fields>
    );

    const data = buildFormDataFromObject(fieldsToUpdate);
    const promise = hatsApi.updateHat(props._id, data).finally(() => {
      fetchHats();
      props.onCloseModal();
    });

    toast.promise(promise, {
      loading: "Updating...",
      success: <b>Hat updated!</b>,
      error: <b>Could not update.</b>,
    });
  };

  const onDelete = () => {
    const promise = hatsApi.deleteHat(props._id).finally(() => {
      fetchHats();
      props.onCloseModal();
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: <b>Hat deleted!</b>,
      error: <b>Could not delete.</b>,
    });
  };

  useEffect(() => {
    if (isDeleteModalOpen) {
      props.onHijackScroll();
    } else {
      props.onReleaseScroll();
    }
  }, [isDeleteModalOpen]);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={fields.name}
            onChange={(e) => onChangeField("name", e.target.value)}
          />
        </label>
        <label>
          Style:
          <select
            name="style"
            value={fields.style}
            onChange={(e) => onChangeField("style", e.target.value)}
          >
            {availableHatStyles.map((style) => (
              <option value={style}>{style}</option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={fields.price}
            min={0}
            onChange={(e) => onChangeField("price", e.target.value)}
          />
        </label>
        <label>
          Colors:
          <div className="flex gap-1">
            {fields.colors.map((color, index) => (
              <HatColor
                color={color}
                isEditable
                onChange={(e) => onChangeColors(e, index)}
              />
            ))}
            <button
              type="button"
              className="flex items-center justify-center add-color border-2 border-dashed border-text/60"
              onClick={onAddColor}
            >
              <AiOutlinePlus fontSize="1.5rem" className="text-text/50" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClearColorSelection}
            className="mt-4"
          >
            Clear Selection
          </button>
        </label>
        <label>
          Sizes:
          <div className="flex gap-1">
            {availableHatSizes.map((size: HatSizeType, index) => (
              <HatSize
                size={size}
                isEditable
                isActive={fields.sizes.includes(size)}
                onChange={() => {
                  const currentSizes = [...fields.sizes];
                  const sizeIndex = currentSizes.indexOf(size);

                  if (sizeIndex > -1) currentSizes.splice(sizeIndex, 1);
                  else currentSizes.push(size);

                  onChangeField("sizes", currentSizes);
                }}
              />
            ))}
          </div>
        </label>
        <label>
          Details:
          <MDEditor
            value={fields.details}
            onChange={(value) => onChangeField("details", value)}
          />
        </label>
        <div className="flex justify-end items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg text-white/80"
            onClick={onToggleDeleteModal}
          >
            Delete
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-accent rounded-lg text-white/80"
          >
            Confirm
          </button>
        </div>
      </form>
      <Modal
        isCentered
        isOpen={isDeleteModalOpen}
        onCloseModal={onToggleDeleteModal}
      >
        <div className="flex flex-col gap-6 p-4">
          <h6>Are you sure you want to delete this hat?</h6>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-primary hover:bg-accent rounded-md px-4 py-2 text-white font-bold"
              onClick={onDelete}
            >
              Yes
            </button>
            <button
              type="button"
              className="bg-transparent rounded-md px-4 py-2 text-text/80 font-bold"
              onClick={(e) => {
                e.preventDefault();
                onToggleDeleteModal();
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
