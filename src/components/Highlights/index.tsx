import Heading from "@theme/Heading"

import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

import styles from "./styles.module.css"

export type CardProps = {
	title: string
	video: string
	description: string
}

function Card(props: CardProps) {
	return (
		<li key={props.title} className="card shadow--md">
			<div className={clsx("card__image")}>
				<video src={props.video} width="100%" autoPlay controls loop muted></video>
			</div>
			<div className="card__body">
				<Heading as="h4">{props.title}</Heading>
				<p>{props.description}</p>
			</div>
			<ul className={clsx("card__footer")}></ul>
		</li>
	)
}

export function Header({
	heading,
	description,
	link,
}: {
	heading: string
	description?: string
	link: { emoji: string; text: string; to: string }
}) {
	return (
		<section className="margin-top--lg margin-bottom--lg text--center">
			<Heading as="h1">{heading}</Heading>
			{description && <p>{description}</p>}
			<Link className={clsx("button button--primary", styles.space)} to={link.to}>
				<span aria-hidden="true">{link.emoji}</span>
				<span>{link.text}</span>
			</Link>
		</section>
	)
}

export function Cards({ from: cards }: { from: CardProps[] }) {
	return (
		<section className="margin-top--lg margin-bottom--xl">
			<div className="container">
				<ul className={clsx("container", "clean-list", styles.cards)}>{cards.map(card => Card(card))}</ul>
			</div>
		</section>
	)
}
