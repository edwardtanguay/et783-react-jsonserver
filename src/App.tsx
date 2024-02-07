import { useEffect, useState } from "react";
import { IWorkout } from "./interfaces";
import axios from "axios";

const backendUrl = 'http://localhost:3601';

function App() {
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/workouts`);
			const _workouts = response.data;
			setWorkouts(_workouts);
		})();
	}, []);

	return (
		<>
			<h1 className="text-2xl">Workout Site</h1>
			<p>There are {workouts.length} workouts.</p>
			<ul>
				{workouts.map(workout => {
					return (
						<li key={workout.id}>{workout.title}</li>
					)
				})}
			</ul>
		</>
	);
}

export default App;
