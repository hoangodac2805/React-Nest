import { useGetUsersQuery } from "@/features/users/userQuery";

type Props = {};

const UserPage = (props: Props) => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

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
