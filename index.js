(() => {
	if (window.location.search === '?success') {
		$('#main').html(`
			<h1 class="title is-2">Thanks for the feedback!</h1>
			<p>I will get back to you as soon as possible.</p>`);

		setTimeout(() => {
			window.location.href = 'https://abranhe.com';
		}, 3000);
	}

	// Form validation
	$('button[type="submit"]').on('click', event => {
		$(event.target)
			.closest('form')
			.find('[required]')
			.addClass('required');
	});

	const params = new URL(location.href).searchParams;

	if (params.has('project')) {
		const projectName = `${params.get('project')}`;
		const title = `Feedback for ${projectName}`;
		$('#main h1').text(title);

		document.getElementById('project').value = `${projectName}`;
	}

	if (params.has('description')) {
		const summary = `${params.get('description')}`;
		$('#main h2').text(summary);
	}

	if (params.has('name')) {
		const username = `${params.get('name')}`;
		document.getElementById('name').value = `${username}`;
	}

	if (params.has('message')) {
		const msg = `${params.get('message')}`;
		document.getElementById('msg').value = `${msg}`;
	}

	if (params.has('email')) {
		const email = `${params.get('email')}`;
		document.getElementById('email').value = `${email}`;
	}

	if (params.has('submit')) {
		document.getElementById("feedback-form").submit();
	}

	if (params.has('url')) {
		const url = `${params.get('url')}`;
		$('#link').html('<a href="' + url + '">' + url + '</a>');
	}

	const form = $('#feedback-form');

	for (const [key, value] of params) {
		if (key === 'nameField') {
			form.find('[name="name"]').val(value);
			continue;
		}

		if (key === 'emailField') {
			form.find('[name="email"]').val(value);
			continue;
		}

		if (key === 'messageField') {
			form.find('[name="message"]').val(value).get(0).setSelectionRange(0, 0);
			continue;
		}

		if (key === 'extraInfo') {
			form.append(
				$(`<textarea style="display:none" readonly name="${key}"></textarea>`).text(value)
			);
			continue;
		}

		form.append(
			$(`<input type="hidden" name="${key}">`).val(value)
		);
	}

	form.on('submit', () => {
		const project = params.has('project') ? (': ' + params.get('project')) : '';
		const message = form.find('[name="message"]').val().slice(0, 100);
		const subject = 'Feedback' + project + ' - ' + message;
		form.prepend(
			$(`<input type="hidden" name="_subject">`).val(subject)
		);
	});
})();
