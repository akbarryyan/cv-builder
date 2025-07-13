import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cvAPI } from "../services/api.js";
import toast from "react-hot-toast";
import Navbar from "../components/user/Navbar";
import {
  Download,
  Edit,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Users,
} from "lucide-react";

const PreviewPage = () => {
  const { cvId } = useParams();
  const navigate = useNavigate();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cvId) {
      loadCV();
    }
  }, [cvId]);

  const loadCV = async () => {
    try {
      setLoading(true);
      const response = await cvAPI.getById(cvId);
      setCvData(response.data);
    } catch (error) {
      console.error("Error loading CV:", error);
      toast.error("Failed to load CV");
      navigate("/cv-builder");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/cv-builder/${cvId}`);
  };

  const handleDownload = () => {
    toast.success("Download feature coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading CV preview...</p>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            CV Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The CV you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/cv-builder")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to CVs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar
        showBackButton={true}
        backButtonText="Back to CVs"
        backButtonPath="/cv-builder"
      />

      {/* Action Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {cvData.metadata?.title || "CV Preview"}
              </h1>
              <p className="text-gray-600">
                Template: {cvData.metadata?.template || "Modern"}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Modern Template */}
          <ATSTemplate cvData={cvData} />
        </div>
      </div>
    </div>
  );
};

// Professional ATS-Compliant CV Template
const ATSTemplate = ({ cvData }) => {
  const {
    personal,
    experience,
    education,
    skills,
    languages,
    projects,
    certifications,
    awards,
  } = cvData;

  return (
    <div
      className="bg-white p-8 max-w-4xl mx-auto"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: "1.15",
        color: "#000000",
      }}
    >
      {/* Header Section - Centered Professional Format */}
      <div className="text-center mb-2 pb-4">
        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontSize: "16pt", fontWeight: "bold" }}
        >
          {personal?.firstName?.toUpperCase()}{" "}
          {personal?.lastName?.toUpperCase()}
        </h1>

        {/* Contact Information - Single Line Format */}
        <div className="text-sm mb-1">
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.email && personal?.phone && <span> | </span>}
          {personal?.email && <span>{personal.email}</span>}
          {personal?.linkedin && (personal?.email || personal?.phone) && (
            <span> | </span>
          )}
          {personal?.linkedin && <span>{personal.linkedin}</span>}
          {personal?.github &&
            (personal?.linkedin || personal?.email || personal?.phone) && (
              <span> | </span>
            )}
          {personal?.github && <span>{personal.github}</span>}
        </div>

        {personal?.address && (
          <div className="text-sm mb-1">{personal.address}</div>
        )}

        {personal?.website && (
          <div className="text-sm mb-3">Website: {personal.website}</div>
        )}

        {/* Professional Summary/Bio in Header */}
        {personal?.summary && (
          <div className="">
            <p className="text-sm leading-relaxed text-justify max-w-3xl mx-auto">
              {personal.summary}
            </p>
          </div>
        )}
      </div>

      {/* Professional Experience */}
      {experience && experience.length > 0 && experience[0].position && (
        <div className="mb-5">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide pb-1 border-b border-black">
            EXPERIENCE
          </h2>
          <div className="space-y-4 mt-3">
            {experience.map(
              (exp, index) =>
                exp.position && (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <h3 className="font-bold text-sm">{exp.position}</h3>
                        <p className="text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="text-sm leading-relaxed ml-4 mt-1">
                        {exp.description.split("\n").map((line, i) => {
                          const cleanLine = line.trim();
                          if (!cleanLine) return null;
                          return (
                            <li
                              key={i}
                              className="mb-1"
                              style={{ listStyleType: "disc" }}
                            >
                              {cleanLine.startsWith("•")
                                ? cleanLine.slice(1).trim()
                                : cleanLine}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].school && (
        <div className="mb-5">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide pb-1 border-b border-black">
            EDUCATION
          </h2>
          <div className="space-y-2 mt-3">
            {education.map(
              (edu, index) =>
                edu.school && (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold text-sm">{edu.degree}</h3>
                        <p className="text-sm">{edu.school}</p>
                        {edu.description && (
                          <p className="text-sm mt-1 italic">
                            {edu.description}
                          </p>
                        )}
                      </div>
                      <span className="text-sm">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && skills[0].skill && (
        <div className="mb-5">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide pb-1 border-b border-black">
            SKILLS
          </h2>
          <div className="text-sm mt-3">
            <p className="leading-relaxed">
              {skills.map((skill, index) => skill.skill).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-5">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wide pb-1 border-b border-black">
            PROJECTS
          </h2>
          <div className="space-y-2 mt-3">
            {projects.map(
              (project, index) =>
                project.name && (
                  <div key={index}>
                    <h3 className="font-bold text-sm">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <p className="text-sm italic">{project.link}</p>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications &&
        certifications.length > 0 &&
        certifications[0].name && (
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wide pb-1 border-b border-black">
              CERTIFICATIONS
            </h2>
            <div className="text-sm space-y-1 mt-3">
              {certifications.map((cert, index) =>
                cert.name ? (
                  <div key={index}>
                    <span className="font-medium">{cert.name}</span>
                    {cert.issuer && <span> - {cert.issuer}</span>}
                    {cert.year && <span> ({cert.year})</span>}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

      {/* Languages */}
      {languages && languages.length > 0 && languages[0].language && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide pb-1 border-b border-black">
            LANGUAGES
          </h2>
          <div className="text-sm mt-3">
            <p>
              {languages
                .map(
                  (lang) =>
                    lang.language && `${lang.language} (${lang.proficiency})`
                )
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && awards[0].title && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide pb-1 border-b border-black">
            AWARDS
          </h2>
          <div className="text-sm space-y-1 mt-3">
            {awards.map((award, index) =>
              award.title ? (
                <div key={index}>
                  <span className="font-medium">{award.title}</span>
                  {award.issuer && <span> - {award.issuer}</span>}
                  {award.year && <span> ({award.year})</span>}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
