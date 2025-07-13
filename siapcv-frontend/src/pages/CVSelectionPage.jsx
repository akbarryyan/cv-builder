import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cvAPI } from "../services/api.js";
import toast from "react-hot-toast";
import Navbar from "../components/user/Navbar";
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Trash2,
  Calendar,
  Palette,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const CVSelectionPage = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    cvId: null,
    cvTitle: "",
  });

  useEffect(() => {
    loadCVs();
  }, []);

  const loadCVs = async () => {
    try {
      setLoading(true);
      const loadingToast = toast.loading("Loading your CVs...");
      const response = await cvAPI.getAll();
      setCvs(response.data || []);
      toast.dismiss(loadingToast);
    } catch (error) {
      console.error("Error loading CVs:", error);
      toast.error("Failed to load CVs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate("/cv-builder/new");
  };

  const handleEditCV = (cvId) => {
    navigate(`/cv-builder/${cvId}`);
  };

  const handleDeleteCV = async (cvId, cvTitle) => {
    setDeleteModal({
      isOpen: true,
      cvId: cvId,
      cvTitle: cvTitle || "this CV",
    });
  };

  const confirmDelete = async () => {
    const { cvId } = deleteModal;
    try {
      const deletingToast = toast.loading("Deleting CV...");
      await cvAPI.delete(cvId);
      toast.dismiss(deletingToast);
      toast.success("CV deleted successfully!");
      loadCVs(); // Reload the list
      setDeleteModal({ isOpen: false, cvId: null, cvTitle: "" });
    } catch (error) {
      console.error("Error deleting CV:", error);
      toast.error("Failed to delete CV");
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, cvId: null, cvTitle: "" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your CVs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar
        showBackButton={true}
        backButtonText="Back to Home"
        backButtonPath="/home"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New CV Card */}
        <div className="mb-8">
          <div
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Plus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Create New CV</h3>
                  <p className="text-purple-100">
                    Start building your professional CV
                  </p>
                </div>
              </div>
              <ArrowRight size={24} />
            </div>
          </div>
        </div>

        {/* Existing CVs */}
        {cvs.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your CVs ({cvs.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {cv.title || cv.metadata?.title || "Untitled CV"}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Palette size={14} className="mr-1" />
                          {cv.template ||
                            cv.metadata?.template ||
                            "Modern"}{" "}
                          Template
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          Updated {formatDate(cv.updated_at)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cv.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {cv.status || "Draft"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCV(cv.id)}
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => navigate(`/preview/${cv.id}`)}
                        className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCV(cv.id, cv.title || cv.metadata?.title)
                        }
                        className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No CVs yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first CV
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={16} />
              <span>Create Your First CV</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete CV
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{deleteModal.cvTitle}"?
                <br />
                <span className="font-medium text-red-600">
                  This action cannot be undone.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVSelectionPage;
