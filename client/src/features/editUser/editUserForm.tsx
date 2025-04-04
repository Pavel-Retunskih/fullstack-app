import {User} from "../../entities/user/model/type.ts";
import {Input} from "../../shared/input/input.tsx";
import {UpdateUser, UpdateUserSchema} from "../createUser/model/schema/schema.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdateUserByIdMutation} from "../../entities/user/api/userApi.ts";
import {ErrorResponse} from "../../shared/type/error.ts";
import {z} from "zod";

type Props = {
  user: User
}

export function EditUserForm({user}: Props) {
  const [updateUser,] = useUpdateUserByIdMutation()
  const {
    control,
    handleSubmit,
    reset,
    register,
    setError,
    formState: {isValid}
  } = useForm<UpdateUserSchema>({resolver: zodResolver(UpdateUser), defaultValues: {...user, weight: +user.weight}})

  const onSubmit: SubmitHandler<UpdateUserSchema> = (data) => {
    try {
      updateUser({id: user.id, updateUser: data})
          .unwrap().then(() => {
      })
          .catch((err: ErrorResponse<Array<{ field: keyof z.infer<typeof UpdateUser>, message: string }>>) => {
            console.log(err)
            err.data.errors.forEach(error => {
              setError(error.field, {message: error.message})
            })
          })
    } catch (err) {
      console.log(err)
    }
  }
  return <div key={user.id} className={'flex flex-row items-center justify-between flex-wrap border border-amber-50' +
      ' px-5 py-2 rounded-md'}>
    <h3 className={'w-full text-3xl text-gray-800 py-4'}>{`Edit User ${user.firstName} ${user.lastName}`}</h3>
    <img src={user.photoUrl} alt="asdasd" className={'h-[200px] w-[200px] rounded-full'}/>
    <div className={'flex flex-col flex-grow flex-wrap gap-10'}>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col border-gray-900 border bg-gray-700 px-5' +
          ' py-5 rounded-md gap-5'}>
        <Input control={control} type={'text'} error={'error'} name={'firstName'} label={'First Name'}/>
        <Input control={control} type={'text'} name={'lastName'} label={'Last Name'}/>
        <div className={'flex justify-between'}>
          <label>Gender Selection</label>
          <select {...register("gender")}
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
        <button onClick={() => reset()}>Reset</button>
      </form>
    </div>

  </div>
}