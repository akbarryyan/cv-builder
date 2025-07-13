import pool from "../config/db.js";

// Create a new CV
export const createCV = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      metadata,
      personal,
      experience,
      education,
      skills,
      languages,
      projects,
      certifications,
      awards,
      organizations,
      references,
    } = req.body;

    const userId = req.user.id; // From auth middleware

    // 1. Insert CV metadata
    const [cvResult] = await connection.execute(
      `INSERT INTO cvs (user_id, title, template, language) VALUES (?, ?, ?, ?)`,
      [userId, metadata.title, metadata.template, metadata.language]
    );

    const cvId = cvResult.insertId;

    // 2. Insert personal information
    await connection.execute(
      `INSERT INTO cv_personal (cv_id, phone, address, summary, linkedin, github, website) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cvId,
        personal.phone,
        personal.address,
        personal.summary,
        personal.linkedin,
        personal.github,
        personal.website,
      ]
    );

    // 3. Insert experiences
    for (const exp of experience) {
      await connection.execute(
        `INSERT INTO cv_experience (cv_id, position, company, start_date, end_date, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          exp.position,
          exp.company,
          exp.startDate,
          exp.current ? null : exp.endDate,
          exp.description,
        ]
      );
    }

    // 4. Insert education
    for (const edu of education) {
      await connection.execute(
        `INSERT INTO cv_education (cv_id, school, degree, start_year, end_year, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          edu.school,
          edu.degree,
          edu.startYear,
          edu.endYear,
          edu.description,
        ]
      );
    }

    // 5. Insert skills
    for (const skill of skills) {
      await connection.execute(
        `INSERT INTO cv_skills (cv_id, skill, level) VALUES (?, ?, ?)`,
        [cvId, skill.skill, skill.level]
      );
    }

    // 6. Insert languages
    for (const lang of languages) {
      await connection.execute(
        `INSERT INTO cv_languages (cv_id, language, proficiency) VALUES (?, ?, ?)`,
        [cvId, lang.language, lang.proficiency]
      );
    }

    // 7. Insert projects
    for (const project of projects) {
      await connection.execute(
        `INSERT INTO cv_projects (cv_id, name, description, link) VALUES (?, ?, ?, ?)`,
        [cvId, project.name, project.description, project.link]
      );
    }

    // 8. Insert certifications
    for (const cert of certifications) {
      await connection.execute(
        `INSERT INTO cv_certifications (cv_id, name, issuer, year) VALUES (?, ?, ?, ?)`,
        [cvId, cert.name, cert.issuer, cert.year]
      );
    }

    // 9. Insert awards
    for (const award of awards) {
      await connection.execute(
        `INSERT INTO cv_awards (cv_id, title, issuer, year) VALUES (?, ?, ?, ?)`,
        [cvId, award.title, award.issuer, award.year]
      );
    }

    // 10. Insert organizations
    for (const org of organizations) {
      await connection.execute(
        `INSERT INTO cv_organizations (cv_id, name, position, start_year, end_year, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          org.name,
          org.position,
          org.startYear,
          org.endYear,
          org.description,
        ]
      );
    }

    // 11. Insert references
    for (const ref of references) {
      await connection.execute(
        `INSERT INTO cv_references (cv_id, name, company, contact) VALUES (?, ?, ?, ?)`,
        [cvId, ref.name, ref.company, ref.contact]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "CV created successfully",
      data: { cvId },
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating CV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create CV",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

// Get CV by ID
export const getCVById = async (req, res) => {
  try {
    const { cvId } = req.params;
    const userId = req.user.id;

    // 1. Get CV metadata
    const [cvRows] = await pool.execute(
      `SELECT * FROM cvs WHERE id = ? AND user_id = ?`,
      [cvId, userId]
    );

    if (cvRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    const cv = cvRows[0];

    // 2. Get personal info
    const [personalRows] = await pool.execute(
      `SELECT * FROM cv_personal WHERE cv_id = ?`,
      [cvId]
    );

    // 3. Get experiences
    const [experienceRows] = await pool.execute(
      `SELECT * FROM cv_experience WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 4. Get education
    const [educationRows] = await pool.execute(
      `SELECT * FROM cv_education WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 5. Get skills
    const [skillsRows] = await pool.execute(
      `SELECT * FROM cv_skills WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 6. Get languages
    const [languagesRows] = await pool.execute(
      `SELECT * FROM cv_languages WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 7. Get projects
    const [projectsRows] = await pool.execute(
      `SELECT * FROM cv_projects WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 8. Get certifications
    const [certificationsRows] = await pool.execute(
      `SELECT * FROM cv_certifications WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 9. Get awards
    const [awardsRows] = await pool.execute(
      `SELECT * FROM cv_awards WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 10. Get organizations
    const [organizationsRows] = await pool.execute(
      `SELECT * FROM cv_organizations WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // 11. Get references
    const [referencesRows] = await pool.execute(
      `SELECT * FROM cv_references WHERE cv_id = ? ORDER BY order_no`,
      [cvId]
    );

    // Get user's first and last name
    const [userRows] = await pool.execute(
      `SELECT first_name, last_name, email FROM users WHERE id = ?`,
      [userId]
    );

    const user = userRows[0];

    // Format the response to match frontend structure
    const cvData = {
      metadata: {
        title: cv.title,
        template: cv.template,
        language: cv.language,
      },
      personal: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: personalRows[0]?.phone || "",
        address: personalRows[0]?.address || "",
        summary: personalRows[0]?.summary || "",
        linkedin: personalRows[0]?.linkedin || "",
        github: personalRows[0]?.github || "",
        website: personalRows[0]?.website || "",
      },
      experience: experienceRows.map((exp) => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        startDate: exp.start_date,
        endDate: exp.end_date,
        description: exp.description,
        current: !exp.end_date,
      })),
      education: educationRows.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        startYear: edu.start_year,
        endYear: edu.end_year,
        description: edu.description,
      })),
      skills: skillsRows.map((skill) => ({
        id: skill.id,
        skill: skill.skill,
        level: skill.level,
      })),
      languages: languagesRows.map((lang) => ({
        id: lang.id,
        language: lang.language,
        proficiency: lang.proficiency,
      })),
      projects: projectsRows.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        link: project.link,
      })),
      certifications: certificationsRows.map((cert) => ({
        id: cert.id,
        name: cert.name,
        issuer: cert.issuer,
        year: cert.year,
      })),
      awards: awardsRows.map((award) => ({
        id: award.id,
        title: award.title,
        issuer: award.issuer,
        year: award.year,
      })),
      organizations: organizationsRows.map((org) => ({
        id: org.id,
        name: org.name,
        position: org.position,
        startYear: org.start_year,
        endYear: org.end_year,
        description: org.description,
      })),
      references: referencesRows.map((ref) => ({
        id: ref.id,
        name: ref.name,
        company: ref.company,
        contact: ref.contact,
      })),
    };

    res.json({
      success: true,
      data: cvData,
    });
  } catch (error) {
    console.error("Error getting CV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get CV",
      error: error.message,
    });
  }
};

// Get all CVs for a user
export const getUserCVs = async (req, res) => {
  try {
    const userId = req.user.id;

    const [cvRows] = await pool.execute(
      `SELECT id, title, template, language, created_at, updated_at 
       FROM cvs WHERE user_id = ? ORDER BY updated_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: cvRows,
    });
  } catch (error) {
    console.error("Error getting user CVs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get CVs",
      error: error.message,
    });
  }
};

// Update CV
export const updateCV = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { cvId } = req.params;
    const userId = req.user.id;
    const {
      metadata,
      personal,
      experience,
      education,
      skills,
      languages,
      projects,
      certifications,
      awards,
      organizations,
      references,
    } = req.body;

    // Verify CV ownership
    const [cvRows] = await connection.execute(
      `SELECT id FROM cvs WHERE id = ? AND user_id = ?`,
      [cvId, userId]
    );

    if (cvRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    // 1. Update CV metadata
    await connection.execute(
      `UPDATE cvs SET title = ?, template = ?, language = ?, updated_at = NOW() 
       WHERE id = ?`,
      [metadata.title, metadata.template, metadata.language, cvId]
    );

    // 2. Update personal information
    await connection.execute(
      `UPDATE cv_personal SET phone = ?, address = ?, summary = ?, 
       linkedin = ?, github = ?, website = ? WHERE cv_id = ?`,
      [
        personal.phone,
        personal.address,
        personal.summary,
        personal.linkedin,
        personal.github,
        personal.website,
        cvId,
      ]
    );

    // 3. Delete and re-insert array sections for simplicity
    await connection.execute(`DELETE FROM cv_experience WHERE cv_id = ?`, [
      cvId,
    ]);
    await connection.execute(`DELETE FROM cv_education WHERE cv_id = ?`, [
      cvId,
    ]);
    await connection.execute(`DELETE FROM cv_skills WHERE cv_id = ?`, [cvId]);
    await connection.execute(`DELETE FROM cv_languages WHERE cv_id = ?`, [
      cvId,
    ]);
    await connection.execute(`DELETE FROM cv_projects WHERE cv_id = ?`, [cvId]);
    await connection.execute(`DELETE FROM cv_certifications WHERE cv_id = ?`, [
      cvId,
    ]);
    await connection.execute(`DELETE FROM cv_awards WHERE cv_id = ?`, [cvId]);
    await connection.execute(`DELETE FROM cv_organizations WHERE cv_id = ?`, [
      cvId,
    ]);
    await connection.execute(`DELETE FROM cv_references WHERE cv_id = ?`, [
      cvId,
    ]);

    // Re-insert all sections (same logic as create)
    for (const exp of experience) {
      await connection.execute(
        `INSERT INTO cv_experience (cv_id, position, company, start_date, end_date, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          exp.position,
          exp.company,
          exp.startDate,
          exp.current ? null : exp.endDate,
          exp.description,
        ]
      );
    }

    for (const edu of education) {
      await connection.execute(
        `INSERT INTO cv_education (cv_id, school, degree, start_year, end_year, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          edu.school,
          edu.degree,
          edu.startYear,
          edu.endYear,
          edu.description,
        ]
      );
    }

    for (const skill of skills) {
      await connection.execute(
        `INSERT INTO cv_skills (cv_id, skill, level) VALUES (?, ?, ?)`,
        [cvId, skill.skill, skill.level]
      );
    }

    for (const lang of languages) {
      await connection.execute(
        `INSERT INTO cv_languages (cv_id, language, proficiency) VALUES (?, ?, ?)`,
        [cvId, lang.language, lang.proficiency]
      );
    }

    for (const project of projects) {
      await connection.execute(
        `INSERT INTO cv_projects (cv_id, name, description, link) VALUES (?, ?, ?, ?)`,
        [cvId, project.name, project.description, project.link]
      );
    }

    for (const cert of certifications) {
      await connection.execute(
        `INSERT INTO cv_certifications (cv_id, name, issuer, year) VALUES (?, ?, ?, ?)`,
        [cvId, cert.name, cert.issuer, cert.year]
      );
    }

    for (const award of awards) {
      await connection.execute(
        `INSERT INTO cv_awards (cv_id, title, issuer, year) VALUES (?, ?, ?, ?)`,
        [cvId, award.title, award.issuer, award.year]
      );
    }

    for (const org of organizations) {
      await connection.execute(
        `INSERT INTO cv_organizations (cv_id, name, position, start_year, end_year, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cvId,
          org.name,
          org.position,
          org.startYear,
          org.endYear,
          org.description,
        ]
      );
    }

    for (const ref of references) {
      await connection.execute(
        `INSERT INTO cv_references (cv_id, name, company, contact) VALUES (?, ?, ?, ?)`,
        [cvId, ref.name, ref.company, ref.contact]
      );
    }

    await connection.commit();

    res.json({
      success: true,
      message: "CV updated successfully",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating CV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update CV",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

// Delete CV
export const deleteCV = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { cvId } = req.params;
    const userId = req.user.id;

    // Verify CV ownership
    const [cvRows] = await connection.execute(
      `SELECT id FROM cvs WHERE id = ? AND user_id = ?`,
      [cvId, userId]
    );

    if (cvRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    // Delete all related data (foreign keys will handle cascade)
    await connection.execute(`DELETE FROM cvs WHERE id = ?`, [cvId]);

    await connection.commit();

    res.json({
      success: true,
      message: "CV deleted successfully",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting CV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete CV",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};
