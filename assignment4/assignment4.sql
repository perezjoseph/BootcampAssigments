SELECT 
    m.movie_name,
    CONCAT(d.first_name, ' ', d.last_name) AS "Director",
    STRING_AGG(CONCAT(a.first_name, ' ', a.last_name), ', ') AS "Actors",
    COUNT(DISTINCT a.actor_id) AS "Number of Actors"
FROM 
    movies m
LEFT JOIN 
    directors d ON m.director_id = d.director_id
JOIN 
    movies_actors ma ON ma.movie_id = m.movie_id
JOIN 
    actors a ON a.actor_id = ma.actor_id
GROUP BY 
    m.movie_id, CONCAT(d.first_name, ' ', d.last_name);
