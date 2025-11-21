import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ users, setUsers }) {
	const [form, setForm] = useState({ name: "", age: "", email: "", city: "" });
	const navigate = useNavigate();

	// unified theme tokens
	const theme = {
		font: "'Inter', system-ui, Arial, sans-serif",
		bgGradient:
			"linear-gradient(135deg,#FFF5F7 0%, #F0F9FF 50%, #F7FFF5 100%)",
		cardBg: "linear-gradient(180deg, #ffffff, #fbfbff)",
		primaryGradient: "linear-gradient(90deg,#7C4DFF,#3EE2A0)",
		accent: "#7C4DFF",
		text: "#0b1221",
		muted: "#556275",
	};

	const styles = {
		page: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: theme.bgGradient,
			fontFamily: theme.font,
			padding: 24,
		},
		card: {
			width: "100%",
			maxWidth: 680,
			background: theme.cardBg,
			borderRadius: 14,
			boxShadow: "0 14px 40px rgba(17,24,39,0.08)",
			padding: "28px 28px",
			border: "1px solid rgba(16,24,40,0.04)",
		},
		header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
		title: { margin: 0, fontSize: 22, color: theme.text },
		subtitle: { margin: 0, fontSize: 13, color: theme.muted },
		form: { display: "grid", gap: 12, marginTop: 14 },
		label: { fontSize: 13, color: theme.muted, marginBottom: 6 },
		input: {
			padding: "12px 14px",
			borderRadius: 10,
			border: "1px solid rgba(16,24,40,0.06)",
			outline: "none",
			fontSize: 15,
			color: theme.text,
			width: "100%",
			boxSizing: "border-box",
			background: "rgba(255,255,255,0.95)",
			transition: "box-shadow .16s, border-color .12s, transform .08s",
		},
		inputFocus: {
			boxShadow: "0 10px 30px rgba(124,77,255,0.12)",
			border: `1px solid ${theme.accent}`,
			transform: "translateY(-1px)",
		},
		row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
		btn: {
			marginTop: 8,
			padding: "12px 16px",
			borderRadius: 12,
			border: "none",
			background: theme.primaryGradient,
			color: "#fff",
			fontWeight: 700,
			cursor: "pointer",
			fontSize: 15,
			letterSpacing: 0.4,
			boxShadow: "0 12px 34px rgba(124,77,255,0.12)",
			transition: "transform .12s, box-shadow .12s",
		},
		btnHover: { transform: "translateY(-3px)", boxShadow: "0 22px 48px rgba(124,77,255,0.16)" },
		help: { fontSize: 13, color: theme.muted, marginTop: 8 },
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

	const [btnHover, setBtnHover] = useState(false);
	const [focused, setFocused] = useState(null);

	return (
		<div style={styles.page}>
			<div style={styles.card}>
				<div style={styles.header}>
					<h1 style={styles.title}>Create User</h1>
					<p style={styles.subtitle}>Clean UI — accessible inputs and controls.</p>
				</div>

				<form style={styles.form} onSubmit={handleSubmit}>
					<div>
						<label style={styles.label} htmlFor="name">Full name</label>
						<input
							id="name"
							name="name"
							placeholder="e.g. Priya Kumar"
							value={form.name}
							onChange={handleChange}
							required
							style={{ ...styles.input, ...(focused === "name" ? styles.inputFocus : {}) }}
							onFocus={() => setFocused("name")}
							onBlur={() => setFocused(null)}
						/>
					</div>

					<div style={styles.row}>
						<div>
							<label style={styles.label} htmlFor="age">Age</label>
							<input
								id="age"
								name="age"
								placeholder="e.g. 28"
								value={form.age}
								onChange={handleChange}
								type="number"
								min="0"
								required
								style={{ ...styles.input, ...(focused === "age" ? styles.inputFocus : {}) }}
								onFocus={() => setFocused("age")}
								onBlur={() => setFocused(null)}
							/>
						</div>

						<div>
							<label style={styles.label} htmlFor="city">City</label>
							<input
								id="city"
								name="city"
								placeholder="e.g. Chennai"
								value={form.city}
								onChange={handleChange}
								required
								style={{ ...styles.input, ...(focused === "city" ? styles.inputFocus : {}) }}
								onFocus={() => setFocused("city")}
								onBlur={() => setFocused(null)}
							/>
						</div>
					</div>

					<div>
						<label style={styles.label} htmlFor="email">Email address</label>
						<input
							id="email"
							name="email"
							placeholder="you@domain.com"
							value={form.email}
							onChange={handleChange}
							type="email"
							required
							style={{ ...styles.input, ...(focused === "email" ? styles.inputFocus : {}) }}
							onFocus={() => setFocused("email")}
							onBlur={() => setFocused(null)}
						/>
					</div>

					<button
						type="submit"
						style={{ ...styles.btn, ...(btnHover ? styles.btnHover : {}) }}
						onMouseEnter={() => setBtnHover(true)}
						onMouseLeave={() => setBtnHover(false)}
						aria-label="Submit user form"
					>
						Submit
					</button>

					<div style={styles.help}>All fields required. Tap Submit to view saved cards.</div>
				</form>
			</div>
		</div>
	);
}

export default FormPage;
