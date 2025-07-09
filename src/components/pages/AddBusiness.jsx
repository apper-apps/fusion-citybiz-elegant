import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";
import { createBusiness } from "@/services/api/businessService";
import ApperIcon from "@/components/ApperIcon";

const AddBusiness = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    city: "",
    address: "",
    phone: "",
    website: "",
    images: []
  });

  const categories = [
    "Restaurants",
    "Healthcare",
    "Shopping",
    "Services",
    "Entertainment",
    "Beauty & Wellness",
    "Education",
    "Automotive",
    "Home & Garden",
    "Technology"
  ];

  const cities = [
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Beer Sheva",
    "Netanya",
    "Ashdod",
    "Petah Tikva",
    "Rishon LeZion",
    "Holon",
    "Ramat Gan"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!formData.city) {
      toast.error("Please select a city");
      return;
    }

    try {
      setLoading(true);
      
      const businessData = {
        ...formData,
        rating: 0,
        reviewCount: 0,
        isApproved: false,
        ownerId: "user-123" // Simulated user ID
      };

      const newBusiness = await createBusiness(businessData);
      
      toast.success("Business submitted successfully! It will be reviewed and approved soon.");
      navigate(`/business/${newBusiness.Id}`);
    } catch (error) {
      toast.error("Failed to submit business. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Plus" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              Add Your Business
            </h1>
            <p className="text-surface-600">
              Join our directory and connect with local customers
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 shadow-premium p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter business name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your business..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter business address"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="bg-surface-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="Info" className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-surface-700">
                    Review Process
                  </span>
                </div>
                <p className="text-sm text-surface-600">
                  Your business will be reviewed by our team and approved within 24-48 hours. 
                  You'll receive a confirmation email once it's live.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="min-w-32"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                      Submit Business
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddBusiness;