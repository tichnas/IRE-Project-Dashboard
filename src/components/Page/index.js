import React, { useState } from "react";

import data from "../../data.json";
import formatDate from "../../utils/formatDate";
import getName from "../../utils/getName";

const Page = ({ id }) => {
  const [publications, setPublications] = useState(false);
  const [details, setDetails] = useState(true);

  if (id < 0) return <p>Please search for someone</p>;

  console.log(data[id]);

  return (
    <>
      <h2>{data[id].ire_person_name.data}</h2>
      {data[id].description && <p>{data[id].description.data}</p>}
      <img
        src={
          data[id].person_image_links
            ? data[id].person_image_links.data[0]
            : data[id].gs_img
            ? (data[id].gs_img.data.startsWith("http")
                ? ""
                : "https://scholar.google.com") + data[id].gs_img.data
            : avatar_img
        }
      />
      <h3>
        Details{" "}
        <span
          onClick={() => setDetails(!details)}
          className={`collapse collapse--${details}`}>
          {details ? "- Collapse" : "+ Expand"}
        </span>
      </h3>
      {details && (
        <table className="details">
          <tbody>
            {data[id].person_name && (
              <tr>
                <td>Names</td>
                <td>
                  {data[id].person_name.data
                    .map((name) => getName(name))
                    .join(", ")}
                </td>
              </tr>
            )}
            {data[id].wikipedia_page_url && (
              <tr>
                <td>Wikipedia link</td>
                <td>
                  <a href={data[id].wikipedia_page_url.data}>
                    {data[id].wikipedia_page_url.data}
                  </a>
                </td>
              </tr>
            )}
            {data[id].associated_website && (
              <tr>
                <td>Other websites</td>
                <td>
                  <ul>
                    {data[id].associated_website.data.map((w) => (
                      <li>
                        <a href={w}>{w}</a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {data[id].person_gender && (
              <tr>
                <td>Gender</td>
                <td>{data[id].person_gender.data}</td>
              </tr>
            )}
            {data[id].person_dob && (
              <tr>
                <td>Date of Birth</td>
                <td>{formatDate(data[id].person_dob.data)}</td>
              </tr>
            )}
            {data[id].country_of_citizenship && (
              <tr>
                <td>Citizenship</td>
                <td>{data[id].country_of_citizenship.data}</td>
              </tr>
            )}
            {data[id].person_domains && (
              <tr>
                <td>Work domains</td>
                <td>{data[id].person_domains.data.join(", ")}</td>
              </tr>
            )}
            {data[id].employer_orgs && (
              <tr>
                <td>Employer Organizations</td>
                <td>{data[id].employer_orgs.data.join(", ")}</td>
              </tr>
            )}
            {data[id].person_job && (
              <tr>
                <td>Jobs</td>
                <td>
                  {Array.isArray(data[id].person_job.data)
                    ? data[id].person_job.data.join(", ")
                    : data[id].person_job.data}
                </td>
              </tr>
            )}
            {data[id].institutions_educated_in && (
              <tr>
                <td>Educated from</td>
                <td>
                  {Array.isArray(data[id].institutions_educated_in.data)
                    ? data[id].institutions_educated_in.data.join(", ")
                    : data[id].institutions_educated_in.data}
                </td>
              </tr>
            )}
            {data[id]["doctoral advisor(s)"] && (
              <tr>
                <td>Doctoral advisor(s)</td>
                <td>{data[id]["doctoral advisor(s)"].data.join(", ")}</td>
              </tr>
            )}
            {data[id].awards_won_by_person && (
              <tr>
                <td>Awards</td>
                <td>
                  <ul>
                    {data[id].awards_won_by_person.data.map((a) => (
                      <li>{a}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {data[id].viaf_list_of_publication_regions && (
              <tr>
                <td>Publication Regions</td>
                <td>
                  {data[id].viaf_pubs_map_image && (
                    <img src={data[id].viaf_pubs_map_image.data} />
                  )}
                  <ul>
                    {data[id].viaf_list_of_publication_regions.data.map((a) => (
                      <li>
                        {a.country} ({a.count})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {data[id].viaf_list_of_publishers && (
              <tr>
                <td>Publishers</td>
                <td className="container">
                  {data[id].viaf_list_of_publishers.data.map((a) => (
                    <p>
                      {a.name} ({a.count})
                    </p>
                  ))}
                </td>
              </tr>
            )}
            {data[id].books_and_works_by_person && (
              <tr>
                <td>Books and Other works</td>
                <td>
                  <ul>
                    {data[id].books_and_works_by_person.data.map((a) => (
                      <li>{a}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {data[id].person_doctoral_students && (
              <tr>
                <td>Doctoral students</td>
                <td>
                  <ul>
                    {data[id].person_doctoral_students.data.map((a) => (
                      <li>
                        {a.name} at {a.school} in {a.year}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {data[id].dblp_co_authors && (
              <tr>
                <td>Co-authors</td>
                <td className="container">
                  {data[id].dblp_co_authors.data.map((a) => (
                    <p>{a}</p>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <h3>
        Publications{" "}
        <span
          onClick={() => setPublications(!publications)}
          className={`collapse collapse--${publications}`}>
          {publications ? "- Collapse" : "+ Expand"}
        </span>
      </h3>
      {publications && (
        <>
          {data[id].dblp_publications ? (
            <table className="publications">
              <thead>
                <th>S. No.</th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
                <th>Co authors</th>
              </thead>
              {data[id].dblp_publications.data.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <a href={p.link_to_work}>{p.title}</a>
                  </td>
                  <td>{p.year}</td>
                  <td>{p.work_type}</td>
                  <td>{p.author && p.author.join(", ")}</td>
                </tr>
              ))}
            </table>
          ) : data[id].gs_publications ? (
            <table className="publications">
              <thead>
                <th>S. No.</th>
                <th>Title</th>
                <th>Year</th>
                <th>Conference</th>
                <th>Cited by</th>
                <th>Co authors</th>
              </thead>
              {data[id].gs_publications.data.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <a href={p.url}>{p.title}</a>
                  </td>
                  <td>{p.year}</td>
                  <td>{p.conference}</td>
                  <td>
                    <a href={p.cited_by}>{p.cited_by_count}</a>
                  </td>
                  <td>{p.co_authors.join(", ")}</td>
                </tr>
              ))}
            </table>
          ) : (
            <p>None</p>
          )}
        </>
      )}
    </>
  );
};

export default Page;

const avatar_img =
  "data:image/png;base64,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";
