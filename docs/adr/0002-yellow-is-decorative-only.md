# Yellow leads the surfaces; dark text carries contrast

Updated 11 October 2026: the user confirmed yellow as the main colour. The redesign
uses light-yellow backgrounds and stronger yellow hero/contact surfaces, with dark
ink text. This supersedes the earlier decorative-only emphasis below. The contrast
constraint remains: no yellow body text on white and no white text on yellow.

## Earlier decision

Mom asked for yellow, green and brown with a light, natural feel. Yellow `#E8B93A` measures
**1.84:1 against white** — far below the 4.5:1 needed for body text and below even the 3:1
for large text. So yellow is restricted to decoration: section-rule accents, chip borders,
borders on step cards, the halo of the focus ring. It never becomes a text colour and never
becomes a surface behind text unless that text is `--ink` (8.57:1, which does pass).

Green carries every action (7.13:1 on cream) and brown carries headings (7.06:1).

This is recorded because it is the kind of constraint a future contributor will read as a
mistake and "fix". A palette containing a strong yellow looks like it wants to be used for a
hero band or a primary button, and nothing in the CSS says why it isn't. If a yellow surface
is wanted later, the rule is not "never yellow" — it is "dark text on yellow", and yellow
still never becomes the contrast carrier for small text.
