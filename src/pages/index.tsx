import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomersList from '../components/Customers';
import { FormValues } from '../types';
import { mockPosts } from '../mock';
import { schema } from '../module/schema';

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    getValues,
    watch,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      password: '',
      role: 'user',
    },
  });

  const watchChangeRole = watch(['role']);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e: any) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const [posts, setPosts] = useState<FormValues[]>(mockPosts);

  const [edit, setEdit] = useState(false);

  const handleEdit = (id: number) => {
    setEdit(!edit);
    const editTodo: FormValues | undefined = posts.find((i: any) => i.id === id);
    reset({ ...editTodo });
  };

  const addNewPost = (data: FormValues) => {
    if(edit){
      setPosts(current => current.map(obj => {
        if(obj.id === data.id){
          return {...obj, id:data.id, firstname:data.firstname, lastname: data.lastname, company:data.company, email:data.email, password:data.password, role:data.role};
        }
        return obj;
      }))
      setEdit(false)
    }else{
      const newPost = {
        ...data,
        id: Date.now(),
      };
      setPosts([...posts, newPost]);
      reset();
      setEdit(false);
    }
  };

  useEffect(() => {
    reset({
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      password: '',
      role: 'user',
    });
  }, [isSubmitSuccessful]);

  const removePost = (post: FormValues) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-80 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
          <div className="sidebar-content px-4 py-6">
            <h1 className="font-bold text-2xl text-black-700 mb-6">Edit Customer</h1>
            <div className="mb-6">
              <form onSubmit={handleSubmit(addNewPost)}>
                <div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-2 w-full group">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        {...register('firstname')}
                        className="bg-transparent	 border border-sky-500 text-slate-600	 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.firstname && <p className="text-red-500 text-sm mt-2">Required</p>}
                    </div>
                    <div className="relative z-0 mb-2 w-full group">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        {...register('lastname')}
                        className="bg-transparent	 border border-gray-300 text-slate-600	 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.lastname && <p className="text-red-500 text-sm mt-2">Required</p>}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-2">Required</p>}
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Status
                  </label>

                  <div className="w-full bg-slate-100 rounded-lg p-1 flex items-center">
                    <label
                      htmlFor="input-role-user"
                      className={`w-full p-2.5 text-center ${
                        getValues('role') === 'user' && 'bg-sky-500 text-white rounded-lg'
                      }`}
                    >
                      <input
                        type="radio"
                        id="input-role-user"
                        value="user"
                        {...register('role')}
                        className="opacity-0 absolute"
                      />
                      User
                    </label>
                    <label
                      htmlFor="input-role-admin"
                      className={`ml-5 w-full p-2.5 text-center ${
                        getValues('role') === 'admin' && 'bg-sky-500 text-white rounded-lg'
                      }`}
                    >
                      <input
                        type="radio"
                        id="input-role-admin"
                        value="admin"
                        {...register('role')}
                        className="opacity-0 absolute"
                      />
                      Administrator
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="eamil"
                    {...register('email')}
                    className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">Invalid Email</p>}
                </div>
                {!edit && (
                  <>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        Password
                      </label>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        id="password"
                        {...register('password')}
                        className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <div className=" absolute ml-60	-mt-8 " onClick={togglePassword}>
                        <img
                          src={
                            passwordShown
                              ? 'https://i.ibb.co/mFdjyN9/Eye-Off.png'
                              : 'https://i.ibb.co/McrhStW/Eye.png'
                          }
                        />
                      </div>

                      {errors.password ? (
                        <p className="text-red-500 text-sm mt-2">8+ characters</p>
                      ) : (
                        <div className="font-normal	text-slate-400	text-sm	 ">
                          <p> 8+ characters</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  className="mb-2 w-full inline-block px-6 py-2.5 bg-sky-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in bg-white">
          <div className="main-content flex flex-col flex-grow p-6">
            <h1 className="font-bold text-2xl text-black-700">Customers</h1>
            <div className="flex flex-col flex-grow bg-white rounded mt-4">
              <div className="flex flex-col">
                <CustomersList remove={removePost} posts={posts} edit={handleEdit} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
