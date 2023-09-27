import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";

import { HatColor, HatSize } from "../hat-modal";
import { Modal, ModalProps } from "../modal/modal";

import { AiOutlinePlus } from "react-icons/ai";
import { buildFormDataFromObject, debounce } from "../../utils";

import { hatsApi } from "../../api/hats";
import { useHatsContext } from "../../contexts/hats";

import {
  Hat,
  HatSize as HatSizeType,
  HatStyle,
  ValidationError,
  availableHatSizes,
  availableHatStyles,
} from "../../contexts/hats/types";

export interface AddHatFields extends Omit<Hat, "_id" | "imageUrl"> {
  image: File | null;
}

export function AddHatModal(props: Omit<ModalProps, "children">) {
  const { fetchHats } = useHatsContext();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [fields, setFields] = useState<AddHatFields>({
    name: "",
    image: null,
    style: availableHatStyles[0] as HatStyle,
    colors: [],
    sizes: [],
    details: "",
    price: 0,
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
    const promise = hatsApi.createHat(data);

    toast.promise(promise, {
      loading: "Creating...",
      success: () => {
        fetchHats();
        props.onCloseModal();
        return <b>Hat created!</b>;
      },
      error: (error: AxiosError) => {
        const errors = error.response?.data as { message?: ValidationError[] };
        if (errors.message && Array.isArray(errors.message)) {
          setValidationErrors(
            errors.message.reduce((acc, error) => {
              acc[error.property] = error.message;
              return acc;
            }, {})
          );
        }
        return <b>Could not create.</b>;
      },
    });
  };

  return (
    <Modal {...props}>
      <div className="px-4 py-4 min-h-screen md:min-h-fit">
        <h5>Create Hat</h5>
        <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
          <label>
            Image:
            <input
              type="file"
              onChange={(e) =>
                onChangeField(
                  "image",
                  e.target.files ? e.target.files[0] : null
                )
              }
            />
            <small className="error-message">
              {validationErrors.image && validationErrors.image}
            </small>
          </label>
          <label>
            Name:
            <input
              type="text"
              value={fields.name}
              onChange={(e) => onChangeField("name", e.target.value)}
            />
            <small className="error-message">
              {validationErrors.name && validationErrors.name}
            </small>
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
            <small className="error-message">
              {validationErrors.style && validationErrors.style}
            </small>
          </label>
          <label>
            Price:
            <input
              type="number"
              value={fields.price}
              min={0}
              onChange={(e) => onChangeField("price", e.target.value)}
            />
            <small className="error-message">
              {validationErrors.price && validationErrors.price}
            </small>
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
            <small className="error-message">
              {validationErrors.colors && validationErrors.colors}
            </small>
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
            <small className="error-message">
              {validationErrors.sizes && validationErrors.sizes}
            </small>
          </label>
          <label>
            Details:
            <MDEditor
              value={fields.details}
              onChange={(value) => onChangeField("details", value)}
            />
            <small className="error-message">
              {validationErrors.details && validationErrors.details}
            </small>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-accent rounded-lg text-white/80"
          >
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
}
