from jinja2 import Environment, FileSystemLoader


def generate_dockerfile(location: str, filename: str, params: dict):
    env = Environment(autoescape=True, loader=FileSystemLoader(location))
    template = env.get_template(filename)
    return template.render(params)


DOCKERFILE_TEMPLATE_NAME = 'Dockerfile.jinja2'
