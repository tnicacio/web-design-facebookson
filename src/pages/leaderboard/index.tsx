import styles from '../../styles/pages/Leaderboard.module.css';
import axios from 'axios';
import Head from 'next/head';
import { MenuBar } from '../../components/MenuBar';
import { GeneralLayout } from '../../components/GeneralLayout';
import { Card } from '../../components/about/Card';

interface User {
  name: string;
  email: string;
  password: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  userList: User[];
}

export default function Leaderboard({ userList }: LeaderboardProps) {
  console.log(userList);
  return <GeneralLayout pageTitle="Leaderboard"></GeneralLayout>;
}

export async function getServerSideProps(ctx) {
  const getUsers = async () => {
    try {
      const usersFetched = (await axios.get('http://localhost:3000/api/users'))
        ?.data;
      const arrayFromUsersFetched = [...usersFetched] || [];
      const usersOrderByCurrentExperienceDesc = arrayFromUsersFetched.sort(
        (a, b) => b.currentExperience - a.currentExperience
      );
      return usersOrderByCurrentExperienceDesc;
    } catch (err) {
      console.log(err);
    }
  };

  const users = await getUsers();
  const userList = [...users];

  return {
    props: {
      userList,
    },
  };
}
