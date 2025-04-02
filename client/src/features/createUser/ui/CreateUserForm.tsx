import {SubmitHandler, useForm} from "react-hook-form";
import {useCreateUserMutation} from "../../../entities/user/api/userApi.ts";
import {Input} from "../../../shared/input/input.tsx";
import {ErrorResponse} from '../../../shared/type/error.ts'
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateUser, CreateUserSchema} from "../model/schema/schema.ts";
import {z} from "zod";


export function CreateUserForm({tempPhotoId, getGender}: {
  tempPhotoId: string | null,
  getGender: (gender: 'male' | 'female') => void
}) {
  const [registerUser] = useCreateUserMutation()
  const {register, handleSubmit, control, setError, reset, formState: {isValid}} = useForm<CreateUserSchema>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(CreateUser)
  });
  console.log(isValid)
  const onChangeGender = (gender: string) => {
    if (gender === 'male' || gender === 'female') {
      getGender(gender)
    }

  }

  const onSubmit: SubmitHandler<CreateUserSchema> = (data) => {
    try {
      registerUser({...data, tempPhotoId})
          .unwrap()
          .then(() => {
            reset()
          })
          .catch((err: ErrorResponse<Array<{ field: keyof z.infer<typeof CreateUser>, message: string }>>) => {
            console.log(err)
            err.data.errors.forEach(error => {
              setError(error.field, {message: error.message})
            })
          })
    } catch (err) {
      console.log(err)
    }
  }


  return (<div className={'max-w-[480px] w-full'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col border-gray-900 border bg-gray-700 px-5' +
            ' py-5 rounded-md gap-5'}>
          <Input control={control} type={'text'} error={'error'} name={'firstName'} label={'First Name'}/>
          <Input control={control} type={'text'} name={'lastName'} label={'Last Name'}/>
          <div className={'flex justify-between'}>
            <label>Gender Selection</label>
            <select {...register("gender")}
                    onChange={e => onChangeGender(e.target.value)}
                    className={'w-1/2 py-2 bg-gray-900 rounded-md px-1 outline-0'}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className={'gap-4 flex flex-col'}>
            <Input control={control} type={'number'} name={'height'} label={'Height'}/>
            <Input control={control} type={'number'} name={'weight'} label={'Weight'}/>
          </div>
          <Input control={control} name={'residence'} label={'Residence'}/>
          <button className={'disabled:opacity-55 py-2 disabled:hover:border-green-400 disabled:hover:bg-green-800' +
              ' bg-green-800' +
              ' rounded-md border' +
              ' border-green-400' +
              ' hover:bg-green-600' +
              ' text-white hover:border-green-800 w-full'}
                  type="submit" disabled={!isValid}>submit
          </button>
        </form>
      </div>

  );
}

