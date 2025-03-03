import { useEffect } from "react";
import { isAxiosError } from "axios";
import { useDispatch, useSelector }  from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchUsers } from "@/features/users";
import { useGetUsersQuery } from "@/features/users/userQuery";

type Props = {};

const UserPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  // const users = useSelector((state: RootState) => state.users.entities);
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // useEffect(() => {
  //   (async function () {
  //     const { meta, payload } = await dispatch(fetchUsers());
  //     if (meta.requestStatus === "rejected") {
  //       if (isAxiosError(payload)) {
  //         // toast(payload.handledMessage)
  //       } else {
  //         console.log(1);
  //       }
  //     }
  //   })();
  // }, [dispatch]);

  return (
    <div>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.userName} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
