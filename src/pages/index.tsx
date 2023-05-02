import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const Home: NextPage = () => {
  // Set Login Informatiion into data using useSession()
  const { data: session } = useSession();
  // If session is null, which mean nobody is logining, so return the following
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  // If session is not null, which mean somebody is logining, so return the to do app
  return (
    <Layout title="Todo App">
      <ArrowLeftOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-blue-600"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut()}
      />
      <p className="my-3 text-xl text-blue-600">{session?.user?.name}</p>
      <TaskList />
      <TaskForm />
    </Layout>
  );
};

export default Home;
