import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cvAPI } from "../services/api.js";
import toast from "react-hot-toast";
import Navbar from "../components/user/Navbar";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Plus,
  Trash2,
  Eye,
  Save,
  Globe,
  FolderOpen,
  Award,
  Trophy,
  Building,
  Users,
} from "lucide-react";

const CVFormPage = () => {
  const navigate = useNavigate();
  const { cvId } = useParams(); // Get CV ID from URL if editing
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [cvData, setCvData] = useState({
    // CV Metadata
    metadata: {
      title: "",
      template: "modern",
      language: "en",
    },
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      linkedin: "",
      github: "",
      website: "",
    },
    experience: [
      {
        id: 1,
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ],
    education: [
      {
        id: 1,
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    skills: [
      {
        id: 1,
        skill: "",
        level: "Beginner",
      },
    ],
    languages: [
      {
        id: 1,
        language: "",
        proficiency: "Beginner",
      },
    ],
    projects: [
      {
        id: 1,
        name: "",
        description: "",
        link: "",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "",
        issuer: "",
        year: "",
      },
    ],
    awards: [
      {
        id: 1,
        title: "",
        issuer: "",
        year: "",
      },
    ],
    organizations: [
      {
        id: 1,
        name: "",
        position: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    references: [
      {
        id: 1,
        name: "",
        company: "",
        contact: "",
      },
    ],
  });

  const [activeSection, setActiveSection] = useState("metadata");
  const loadedRef = useRef(null); // Track which CV has been loaded

  // Load CV data if editing
  useEffect(() => {
    if (cvId && cvId !== loadedRef.current) {
      loadCV();
    }
  }, [cvId]); // Only re-run when cvId changes

  const loadCV = async () => {
    // Prevent loading the same CV multiple times
    if (loadedRef.current === cvId || loading) return;

    try {
      setLoading(true);
      loadedRef.current = cvId; // Mark this CV as being loaded

      const loadingToast = toast.loading("Loading CV data...");
      const response = await cvAPI.getById(cvId);
      setCvData(response.data);
      toast.dismiss(loadingToast);

      // Only show success notification once
      toast.success("CV loaded successfully!", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error loading CV:", error);
      toast.error("Failed to load CV data");
      loadedRef.current = null; // Reset on error so it can retry
    } finally {
      setLoading(false);
    }
  };

  // Personal Info handlers
  const handlePersonalChange = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Metadata handlers
  const handleMetadataChange = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value,
      },
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    };
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: "",
      degree: "",
      startYear: "",
      endYear: "",
      description: "",
    };
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills handlers
  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      skill: "",
      level: "Beginner",
    };
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  // Languages handlers
  const addLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      language: "",
      proficiency: "Beginner",
    };
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }));
  };

  const updateLanguage = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const removeLanguage = (id) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  // Projects handlers
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      link: "",
    };
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  };

  const removeProject = (id) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }));
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      issuer: "",
      year: "",
    };
    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const updateCertification = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (id) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  // Awards handlers
  const addAward = () => {
    const newAward = {
      id: Date.now(),
      title: "",
      issuer: "",
      year: "",
    };
    setCvData((prev) => ({
      ...prev,
      awards: [...prev.awards, newAward],
    }));
  };

  const updateAward = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) =>
        award.id === id ? { ...award, [field]: value } : award
      ),
    }));
  };

  const removeAward = (id) => {
    setCvData((prev) => ({
      ...prev,
      awards: prev.awards.filter((award) => award.id !== id),
    }));
  };

  // Organizations handlers
  const addOrganization = () => {
    const newOrg = {
      id: Date.now(),
      name: "",
      position: "",
      startYear: "",
      endYear: "",
      description: "",
    };
    setCvData((prev) => ({
      ...prev,
      organizations: [...prev.organizations, newOrg],
    }));
  };

  const updateOrganization = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      organizations: prev.organizations.map((org) =>
        org.id === id ? { ...org, [field]: value } : org
      ),
    }));
  };

  const removeOrganization = (id) => {
    setCvData((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((org) => org.id !== id),
    }));
  };

  // References handlers
  const addReference = () => {
    const newRef = {
      id: Date.now(),
      name: "",
      company: "",
      contact: "",
    };
    setCvData((prev) => ({
      ...prev,
      references: [...prev.references, newRef],
    }));
  };

  const updateReference = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const removeReference = (id) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.filter((ref) => ref.id !== id),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const savingToast = toast.loading(
        cvId ? "Updating CV..." : "Creating CV..."
      );

      if (cvId) {
        // Update existing CV
        await cvAPI.update(cvId, cvData);
        toast.dismiss(savingToast);
        toast.success("CV updated successfully!");
      } else {
        // Create new CV
        const response = await cvAPI.create(cvData);
        toast.dismiss(savingToast);
        toast.success("CV created successfully!");
        // Redirect to edit mode with the new CV ID
        navigate(`/cv-builder/${response.data.cvId}`);
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      toast.error(error.response?.data?.message || "Failed to save CV");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // TODO: Navigate to preview page with data
    console.log("Preview CV:", cvData);
    navigate(`/cv-preview/${cvId || "new"}`, { state: { cvData } });
  };

  const sections = [
    { id: "metadata", label: "CV Details", icon: FileText },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "languages", label: "Languages", icon: Globe },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "awards", label: "Awards", icon: Trophy },
    { id: "organizations", label: "Organizations", icon: Building },
    { id: "references", label: "References", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading CV...</p>
          </div>
        </div>
      )}

      {/* Header with Navbar */}
      <Navbar
        showBackButton={true}
        backButtonText="Back to CVs"
        backButtonPath="/cv-builder"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Sections
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handlePreview}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* CV Metadata Section */}
              {activeSection === "metadata" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    CV Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV Title
                      </label>
                      <input
                        type="text"
                        value={cvData.metadata.title}
                        onChange={(e) =>
                          handleMetadataChange("title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Senior Web Developer CV"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template
                      </label>
                      <select
                        value={cvData.metadata.template}
                        onChange={(e) =>
                          handleMetadataChange("template", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="creative">Creative</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={cvData.metadata.language}
                        onChange={(e) =>
                          handleMetadataChange("language", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="id">Bahasa Indonesia</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Info Section */}
              {activeSection === "personal" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={cvData.personal.firstName}
                        onChange={(e) =>
                          handlePersonalChange("firstName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={cvData.personal.lastName}
                        onChange={(e) =>
                          handlePersonalChange("lastName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={cvData.personal.email}
                        onChange={(e) =>
                          handlePersonalChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={cvData.personal.phone}
                        onChange={(e) =>
                          handlePersonalChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={cvData.personal.address}
                        onChange={(e) =>
                          handlePersonalChange("address", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Jakarta, Indonesia"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={cvData.personal.linkedin}
                        onChange={(e) =>
                          handlePersonalChange("linkedin", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={cvData.personal.github}
                        onChange={(e) =>
                          handlePersonalChange("github", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://github.com/johndoe"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Summary
                      </label>
                      <textarea
                        value={cvData.personal.summary}
                        onChange={(e) =>
                          handlePersonalChange("summary", e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Brief description about yourself and your career goals..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Work Experience
                    </h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {cvData.experience.map((exp, index) => (
                      <div
                        key={exp.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Experience #{index + 1}
                          </h3>
                          {cvData.experience.length > 1 && (
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Position
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "position",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="ABC Company"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "startDate",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={exp.endDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              disabled={exp.current}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "current",
                                    e.target.checked
                                  )
                                }
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor={`current-${exp.id}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                I currently work here
                              </label>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={exp.description}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Education
                    </h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Education</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {cvData.education.map((edu, index) => (
                      <div
                        key={edu.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Education #{index + 1}
                          </h3>
                          {cvData.education.length > 1 && (
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              School/University
                            </label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "school",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="University of Indonesia"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Degree/Major
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "degree",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Bachelor of Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Year
                            </label>
                            <input
                              type="number"
                              value={edu.startYear}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "startYear",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Year
                            </label>
                            <input
                              type="number"
                              value={edu.endYear}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "endYear",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2024"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={edu.description}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Relevant coursework, achievements, GPA..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Skill #{index + 1}
                          </h3>
                          {cvData.skills.length > 1 && (
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skill Name
                            </label>
                            <input
                              type="text"
                              value={skill.skill}
                              onChange={(e) =>
                                updateSkill(skill.id, "skill", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="JavaScript"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Level
                            </label>
                            <select
                              value={skill.level}
                              onChange={(e) =>
                                updateSkill(skill.id, "level", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {activeSection === "languages" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Languages
                    </h2>
                    <button
                      onClick={addLanguage}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Language</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.languages.map((lang, index) => (
                      <div
                        key={lang.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Language #{index + 1}
                          </h3>
                          {cvData.languages.length > 1 && (
                            <button
                              onClick={() => removeLanguage(lang.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Language
                            </label>
                            <input
                              type="text"
                              value={lang.language}
                              onChange={(e) =>
                                updateLanguage(
                                  lang.id,
                                  "language",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="English"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Proficiency
                            </label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) =>
                                updateLanguage(
                                  lang.id,
                                  "proficiency",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Native">Native</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === "projects" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Projects
                    </h2>
                    <button
                      onClick={addProject}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {cvData.projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Project #{index + 1}
                          </h3>
                          {cvData.projects.length > 1 && (
                            <button
                              onClick={() => removeProject(project.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Project Name
                            </label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="E-commerce Website"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Project Link (Optional)
                            </label>
                            <input
                              type="url"
                              value={project.link}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  "link",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={project.description}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Describe the project, technologies used, and your role..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === "certifications" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Certifications
                    </h2>
                    <button
                      onClick={addCertification}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Certification</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.certifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Certification #{index + 1}
                          </h3>
                          {cvData.certifications.length > 1 && (
                            <button
                              onClick={() => removeCertification(cert.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Certification Name
                            </label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) =>
                                updateCertification(
                                  cert.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="AWS Certified Developer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Issuer
                            </label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) =>
                                updateCertification(
                                  cert.id,
                                  "issuer",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Year
                            </label>
                            <input
                              type="number"
                              value={cert.year}
                              onChange={(e) =>
                                updateCertification(
                                  cert.id,
                                  "year",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2024"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards Section */}
              {activeSection === "awards" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Awards</h2>
                    <button
                      onClick={addAward}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Award</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.awards.map((award, index) => (
                      <div
                        key={award.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Award #{index + 1}
                          </h3>
                          {cvData.awards.length > 1 && (
                            <button
                              onClick={() => removeAward(award.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Award Title
                            </label>
                            <input
                              type="text"
                              value={award.title}
                              onChange={(e) =>
                                updateAward(award.id, "title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Best Employee of the Year"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Issuer
                            </label>
                            <input
                              type="text"
                              value={award.issuer}
                              onChange={(e) =>
                                updateAward(award.id, "issuer", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="ABC Company"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Year
                            </label>
                            <input
                              type="number"
                              value={award.year}
                              onChange={(e) =>
                                updateAward(award.id, "year", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2024"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizations Section */}
              {activeSection === "organizations" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Organizations
                    </h2>
                    <button
                      onClick={addOrganization}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Organization</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {cvData.organizations.map((org, index) => (
                      <div
                        key={org.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Organization #{index + 1}
                          </h3>
                          {cvData.organizations.length > 1 && (
                            <button
                              onClick={() => removeOrganization(org.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Organization Name
                            </label>
                            <input
                              type="text"
                              value={org.name}
                              onChange={(e) =>
                                updateOrganization(
                                  org.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="IEEE Computer Society"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Position
                            </label>
                            <input
                              type="text"
                              value={org.position}
                              onChange={(e) =>
                                updateOrganization(
                                  org.id,
                                  "position",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Member / Vice President / etc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Year
                            </label>
                            <input
                              type="number"
                              value={org.startYear}
                              onChange={(e) =>
                                updateOrganization(
                                  org.id,
                                  "startYear",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Year
                            </label>
                            <input
                              type="number"
                              value={org.endYear}
                              onChange={(e) =>
                                updateOrganization(
                                  org.id,
                                  "endYear",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="2024"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={org.description}
                              onChange={(e) =>
                                updateOrganization(
                                  org.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Describe your role and contributions..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References Section */}
              {activeSection === "references" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      References
                    </h2>
                    <button
                      onClick={addReference}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Reference</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.references.map((ref, index) => (
                      <div
                        key={ref.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Reference #{index + 1}
                          </h3>
                          {cvData.references.length > 1 && (
                            <button
                              onClick={() => removeReference(ref.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={ref.name}
                              onChange={(e) =>
                                updateReference(ref.id, "name", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={ref.company}
                              onChange={(e) =>
                                updateReference(
                                  ref.id,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="ABC Company"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contact
                            </label>
                            <input
                              type="text"
                              value={ref.contact}
                              onChange={(e) =>
                                updateReference(
                                  ref.id,
                                  "contact",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="john@company.com or +62 123-456-789"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVFormPage;
