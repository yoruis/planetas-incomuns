import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const { rows } = await sql`
      SELECT p.*, d.*
      FROM planets p
      LEFT JOIN planet_details d
        ON d.planet_id = p.id
      WHERE p.id = ${id}
    `;

    if (rows.length === 0) {
      return Response.json(null, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
