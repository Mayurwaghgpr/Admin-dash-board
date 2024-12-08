
const Home =() =>{
  return (
   <div className="w-full max-w-4xl mx-auto mt-8 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the RBAC System!</h1>
      <p className="text-lg text-gray-600 mb-6">
        You are logged in as a <span className="font-medium"></span>.
      </p>

      <div className=" m-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
            <p className="text-gray-700 mb-4">
              As an admin, you can manage users, view system analytics, and configure settings.
            </p>
          </div>
      
    </div>
</div>
  );
}

export default Home