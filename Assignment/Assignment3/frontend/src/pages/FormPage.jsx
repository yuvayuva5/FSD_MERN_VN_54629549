import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ users, setUsers }) {
	const [form, setForm] = useState({ name: "", age: "", email: "", city: "" });
	const navigate = useNavigate();

	// colorful styles
	const styles = {
		page: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background:
				"radial-gradient(circle at 10% 20%, #FFDEE9 0%, transparent 20%), radial-gradient(circle at 90% 80%, #B5FFFC 0%, transparent 20%), linear-gradient(135deg,#FFB86B 0%,#7C4DFF 50%,#3EE2A0 100%)",
			fontFamily: "'Inter', system-ui, Arial",
			padding: 24,
		},
		card: {
			width: "100%",
			maxWidth: 560,
			background:
				"linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
			borderRadius: 16,
			boxShadow: "0 12px 50px rgba(15,23,42,0.18)",
			padding: "28px 26px",
			border: "1px solid rgba(255,255,255,0.6)",
			backdropFilter: "blur(6px)",
		},
		headerWrap: {
			display: "flex",
			alignItems: "center",
			gap: 12,
		},
		accentDot: {
			width: 14,
			height: 14,
			borderRadius: 6,
			background:
				"conic-gradient(#ff6b6b,#ffd93d,#6bffb8,#6b8bff,#ff6b6b)",
			boxShadow: "0 4px 18px rgba(99,102,241,0.28)",
		},
		title: {
			margin: 0,
			marginBottom: 6,
			fontSize: 22,
			color: "#0b1221",
			letterSpacing: 0.2,
		},
		subtitle: { margin: 0, fontSize: 13, color: "#334155" },
		form: {
			display: "grid",
			gap: 12,
			marginTop: 14,
		},
		input: {
			padding: "12px 14px",
			borderRadius: 10,
			border: "1px solid transparent",
			outline: "none",
			fontSize: 15,
			color: "#0b1221",
			width: "100%",
			boxSizing: "border-box",
			background:
				"linear-gradient(180deg, rgba(255,255,255,0.95), rgba(250,250,255,0.85))",
			boxShadow: "inset 0 -2px 8px rgba(16,24,40,0.03)",
			transition: "box-shadow .18s, transform .08s, border-color .12s",
		},
		inputFocus: {
			boxShadow:
				"0 6px 18px rgba(99,102,241,0.18), inset 0 -2px 8px rgba(16,24,40,0.03)",
			border: "1px solid rgba(99,102,241,0.9)",
			transform: "translateY(-1px)",
		},
		row: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: 12,
		},
		btn: {
			marginTop: 8,
			padding: "12px 16px",
			borderRadius: 12,
			border: "none",
			background:
				"linear-gradient(90deg,#ff6b6b,#ffb86b 35%,#7C4DFF 70%)",
			color: "#fff",
			fontWeight: 700,
			cursor: "pointer",
			fontSize: 15,
			letterSpacing: 0.4,
			boxShadow: "0 10px 30px rgba(124,77,255,0.14)",
			transition: "transform .12s, box-shadow .12s, filter .12s",
		},
		btnHover: {
			transform: "translateY(-3px)",
			filter: "brightness(1.03)",
			boxShadow: "0 18px 40px rgba(124,77,255,0.18)",
		},
		help: { fontSize: 13, color: "#334155", marginTop: 8 },
	};

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newUser = {
			id: (users?.length ?? 0) + 1,
			...form,
			createdAt: new Date().toISOString(),
		};
		setUsers([...(users ?? []), newUser]);
		navigate("/cards");
	}

	// small local state for hover/focus styles (keeps file simple)
	const [btnHover, setBtnHover] = useState(false);
	const [focused, setFocused] = useState(null);

	return (
		<div style={styles.page}>
			<div style={styles.card}>
				<div style={styles.headerWrap}>
					<div style={styles.accentDot} />
					<div>
						<h1 style={styles.title}>Create Colorful User</h1>
						<p style={styles.subtitle}>
							Add a user — this form looks lively and modern.
						</p>
					</div>
				</div>

				<form style={styles.form} onSubmit={handleSubmit}>
					<input
						name="name"
						placeholder="Full name"
						value={form.name}
						onChange={handleChange}
						required
						style={{
							...styles.input,
							...(focused === "name" ? styles.inputFocus : {}),
						}}
						onFocus={() => setFocused("name")}
						onBlur={() => setFocused(null)}
					/>

					<div style={styles.row}>
						<input
							name="age"
							placeholder="Age"
							value={form.age}
							onChange={handleChange}
							type="number"
							min="0"
							required
							style={{
								...styles.input,
								...(focused === "age" ? styles.inputFocus : {}),
							}}
							onFocus={() => setFocused("age")}
							onBlur={() => setFocused(null)}
						/>

						<input
							name="city"
							placeholder="City"
							value={form.city}
							onChange={handleChange}
							required
							style={{
								...styles.input,
								...(focused === "city" ? styles.inputFocus : {}),
							}}
							onFocus={() => setFocused("city")}
							onBlur={() => setFocused(null)}
						/>
					</div>

					<input
						name="email"
						placeholder="Email address"
						value={form.email}
						onChange={handleChange}
						type="email"
						required
						style={{
							...styles.input,
							...(focused === "email" ? styles.inputFocus : {}),
						}}
						onFocus={() => setFocused("email")}
						onBlur={() => setFocused(null)}
					/>

					<button
						className="btn"
						type="submit"
						style={{ ...styles.btn, ...(btnHover ? styles.btnHover : {}) }}
						onMouseEnter={() => setBtnHover(true)}
						onMouseLeave={() => setBtnHover(false)}
					>
						Submit
					</button>

					<div style={styles.help}>
						All fields are required. You will be redirected to the cards page
						after submit.
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormPage;
