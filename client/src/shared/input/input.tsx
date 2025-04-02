import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {InputHTMLAttributes} from "react";

type Props<T extends FieldValues> = {
  name: string
  label: string
  error?: string
} & UseControllerProps<T>
    & InputHTMLAttributes<HTMLInputElement>

export function Input<T extends FieldValues>({control, name, label, ...rest}: Props<T>) {
  const {field, fieldState: {error}} = useController({control, name})
  return <div className={'flex flex-col gap-2 items-center'}>
    <div className={'flex justify-between flex-wrap w-full'}>
      <label>{label}</label>
      <input {...rest}
             onChange={(e) => {
               const value = rest.type === "number" ? Number(e.target.value) || "" : e.target.value;
               field.onChange(value);
             }} name={field.name} value={field.value ?? ''}
             onBlur={field.onBlur}
             className={'px-5 py-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]' + ' bg-gray-900' + ' rounded-md text-white outline-0 border border-gray-600' +
                 ' focus:border-green-500'}/>
    </div>

    {error && <div className={'text-red-600 text-sm flex'}><span>{error.message}</span></div>}
  </div>
}