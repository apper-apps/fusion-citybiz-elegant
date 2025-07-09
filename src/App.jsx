import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import CategoryListing from "@/components/pages/CategoryListing";
import BusinessDetail from "@/components/pages/BusinessDetail";
import SearchResults from "@/components/pages/SearchResults";
import AddBusiness from "@/components/pages/AddBusiness";

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100"
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<CategoryListing />} />
          <Route path="business/:businessId" element={<BusinessDetail />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="add-business" element={<AddBusiness />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="top-4 right-4"
      />
    </motion.div>
  );
};

export default App;